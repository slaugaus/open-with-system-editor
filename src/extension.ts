import sysOpen = require('open');
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(OpenWithSystemEditorProvider.register());
}

export class OpenWithSystemEditorProvider implements vscode.CustomEditorProvider {

	public static register(): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider(
			"open-with-system-editor.hackJob",
			new OpenWithSystemEditorProvider()
		);
	}

	public async resolveCustomEditor(
		document: vscode.CustomDocument,
		panel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		panel.webview.html = "Opened a file in an external program. I should close shortly, but it's OK to close me if not.";
		this._openFile(document.uri);
		// Calling dispose directly shows an error message, but doing it with setInterval doesn't!
		setInterval(() => panel.dispose(), 0);
	}

	private _openFile(uri: vscode.Uri): void {
		if (uri.scheme) {
			// console.log("Opening from uri", uri.toString());
			try {
				sysOpen(decodeURIComponent(uri.toString())).then((process) => {
					process.on("exit", (code) => {
						if (code !== 0) {
							vscode.window.showErrorMessage(`Couldn't open file: Process exited with code ${code}.`);
						}
					});
				});
			} catch (error) {
				vscode.window.showErrorMessage(`Couldn't open file: ${error}`);
			}

			return;
		}
		vscode.window.showErrorMessage(`Couldn't open file: Problematic URI: ${uri.toString()}`);
	}

	//#region CustomEditorProvider Stubs
	public async openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, token: vscode.CancellationToken): Promise<vscode.CustomDocument> {
		return { uri, dispose: () => { } };
	}

	private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<vscode.CustomDocumentEditEvent>();
	public readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

	public saveCustomDocument(document: vscode.CustomDocument, cancellation: vscode.CancellationToken): Thenable<void> {
		return new Promise<void>(() => { });
	}

	public saveCustomDocumentAs(document: vscode.CustomDocument, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
		return new Promise<void>(() => { });
	}

	public revertCustomDocument(document: vscode.CustomDocument, cancellation: vscode.CancellationToken): Thenable<void> {
		return new Promise<void>(() => { });
	}

	public backupCustomDocument(document: vscode.CustomDocument, context: vscode.CustomDocumentBackupContext, cancellation: vscode.CancellationToken): Thenable<vscode.CustomDocumentBackup> {
		return new Promise<vscode.CustomDocumentBackup>(() => { });
	}
	//#endregion
}