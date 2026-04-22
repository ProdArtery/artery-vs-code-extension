import * as vscode from 'vscode';
import * as http from 'http';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const POLL_INTERVAL_MS = 5000;
const DEFAULT_PORT = 7879;

function healthURL(): string {
    const portFile = path.join(os.homedir(), '.artery', 'api.port');
    try {
        const port = parseInt(fs.readFileSync(portFile, 'utf8').trim(), 10);
        if (!isNaN(port)) { return `http://127.0.0.1:${port}/health`; }
    } catch {}
    return `http://127.0.0.1:${DEFAULT_PORT}/health`;
}

export function activate(context: vscode.ExtensionContext) {
    const binaryPath = path.join(context.extensionPath, 'bin', 'artery-core');
    const provider = new ArteryMcpProvider(binaryPath);

    context.subscriptions.push(provider);
    context.subscriptions.push(
        vscode.lm.registerMcpServerDefinitionProvider('artery', provider)
    );

    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.command = 'artery.showStatus';
    context.subscriptions.push(statusBar);

    context.subscriptions.push(
        vscode.commands.registerCommand('artery.showStatus', () => {
            const msg = provider.isRunning
                ? 'Artery is connected. AI agents can access your API collections.'
                : 'Artery is not running. Open the Artery app and start the AI server.';
            vscode.window.showInformationMessage(msg);
        })
    );

    const refresh = async () => {
        const running = await checkHealth();
        provider.setRunning(running);
        statusBar.text = running ? '$(check) Artery' : '$(circle-slash) Artery';
        statusBar.tooltip = running
            ? 'Artery connected — click for details'
            : 'Artery not running — open the Artery app and start the AI server';
        statusBar.show();
    };

    refresh();
    const timer = setInterval(refresh, POLL_INTERVAL_MS);
    context.subscriptions.push({ dispose: () => clearInterval(timer) });
}

function checkHealth(): Promise<boolean> {
    return new Promise(resolve => {
        const req = http.get(healthURL(), res => {
            resolve(res.statusCode === 200);
            res.resume();
        });
        req.on('error', () => resolve(false));
        req.setTimeout(2000, () => { req.destroy(); resolve(false); });
    });
}

class ArteryMcpProvider implements vscode.McpServerDefinitionProvider, vscode.Disposable {
    private _running = false;
    private _emitter = new vscode.EventEmitter<void>();

    readonly onDidChangeMcpServerDefinitions = this._emitter.event;

    constructor(private readonly binaryPath: string) {}

    get isRunning() { return this._running; }

    setRunning(running: boolean) {
        if (running !== this._running) {
            this._running = running;
            this._emitter.fire();
        }
    }

    provideMcpServerDefinitions(): vscode.McpServerDefinition[] {
        if (!this._running) {
            return [];
        }
        if (!fs.existsSync(this.binaryPath)) {
            vscode.window.showErrorMessage('Artery: bundled artery-core binary not found. Please reinstall the extension.');
            return [];
        }
        return [new vscode.McpStdioServerDefinition('Artery', this.binaryPath, [])];
    }

    dispose() {
        this._emitter.dispose();
    }
}

export function deactivate() {}

