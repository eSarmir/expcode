import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';
import path from 'path';
import * as fs from 'fs';
import { LanguageLevels } from './languageLevels';

export class ExpcodeTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private _onDidChangeTreeData: vscode.EventEmitter<LanguageTreeItem | undefined> 
        = new vscode.EventEmitter<LanguageTreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<LanguageTreeItem | undefined> = this._onDidChangeTreeData.event;

    private readonly LanguageLevels: LanguageLevels;

    constructor(languageLevels: LanguageLevels) {
        this.LanguageLevels = languageLevels;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: LanguageTreeItem): Thenable<vscode.TreeItem[]> {
        if (element) {
            return Promise.resolve(element.children);
        } else {
            return Promise.resolve(
                this.LanguageLevels.getLanguageLevels().map(level => {
                    return new LanguageTreeItem(
                        level,
                        vscode.TreeItemCollapsibleState.Expanded
                    );
                })
            );
        }
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }
}

class LanguageTreeItem extends vscode.TreeItem {

    public readonly children: vscode.TreeItem[];

    constructor(
        public readonly LanguageLevel: LanguageLevel,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        super(LanguageLevel.getLanguageId(), collapsibleState);

        this.description = `Progress: ${Math.round(LanguageLevel.calculateProgress())}%`;
        this.children = this.populateChildrenElements();

        var iconPath = vscode.Uri.file(path.join(__dirname, '..', 'resources', `${LanguageLevel.getLanguageId()}.svg`));

        if (!fs.existsSync(iconPath.fsPath)) {
            iconPath = vscode.Uri.file(path.join(__dirname, '..', 'resources', 'default.svg'));
        }

        this.iconPath = {
            light: iconPath,
            dark: iconPath
        };

        if (LanguageLevel.getLanguageId() !== 'overall') {
            this.contextValue = 'language';
        }
    }

    populateChildrenElements(): vscode.TreeItem[] {
        return [
            new vscode.TreeItem('Level: ' + this.LanguageLevel.getLevel()),
            new vscode.TreeItem('Experience: ' + this.LanguageLevel.getExperience()),
            new vscode.TreeItem('Experience to next level: ' + this.LanguageLevel.getNextLevelExpTreshold())
        ];
    }

    getProgress(): string {
        return `${this.LanguageLevel.getExperience()} / ${this.LanguageLevel.getNextLevelExpTreshold()}`;    
    }

    
}