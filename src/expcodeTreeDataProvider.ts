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

    getChildren(element?: LanguageTreeItem): Thenable<vscode.TreeItem[]> {
        if (element) {
            return Promise.resolve(element.children);
        } else {
            return Promise.resolve(
                this.LanguageLevels.map(level => {
                    return new LanguageTreeItem(
                        level,
                        vscode.TreeItemCollapsibleState.Expanded
                    );
                })
            );
        }
    }
}

class LanguageTreeItem extends vscode.TreeItem {

    public readonly children: vscode.TreeItem[];

    constructor(
        public readonly LanguageLevel: LanguageLevel,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        super(LanguageLevel.getLanguageId(), collapsibleState);

        this.description = `Progress: ${LanguageLevel.calculateProgress()}%`;
        this.children = this.populateChildrenElements();
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