import * as vscode from 'vscode';
import { LanguageLevel } from './languageLevel';

export class ExpcodeTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    private readonly LanguageLevels: LanguageLevel[];

    constructor(languageLevels: LanguageLevel[]) {
        this.LanguageLevels = languageLevels;
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
        if (element) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve(
                this.LanguageLevels.map(level => {
                    return new LanguageTreeItem(
                        level,
                        vscode.TreeItemCollapsibleState.None
                    );
                })
            );
        }
    }
}

class LanguageTreeItem extends vscode.TreeItem {
    

    constructor(
        public readonly LanguageLevel: LanguageLevel,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(LanguageLevel.getLanguageId(), collapsibleState);

        this.description = `Level: ${this.LanguageLevel.getLevel()} Progress: ${this.getProgress()}`;
    }

    getProgress(): string {
        return `${this.LanguageLevel.getExperience()} / ${this.LanguageLevel.getExpToNextLevel()}`;    
    }
}