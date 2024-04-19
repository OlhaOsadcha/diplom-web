/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'libMarkdown',
  standalone: true,
})
export class LibMarkdownPipe implements PipeTransform {
  public transform(value: any): SafeHtml {
    return value?.length > 0 ? (this.renderMarkdown(value) as string) : '';
  }

  private renderMarkdown(value: any): SafeHtml {
    value = this.addNewLinesToCustomSkips(value);
    marked.setOptions({ breaks: false });
    let markdown = marked(value) as any;
    markdown = markdown.replace(/<a/g, "<a target='_blank' rel='noopener noreferrer'");
    markdown = this.replaceCustomSkipsWithFixedHeightDivs(markdown);

    return markdown;
  }

  private addNewLinesToCustomSkips(value: any): string {
    value = value.replace(/\\bigskip/g, '\n\\\\bigskip\n');
    value = value.replace(/\\mediumskip/g, '\n\\\\mediumskip\n');
    value = value.replace(/\\smallskip/g, '\n\\\\smallskip\n');
    return value;
  }

  private replaceCustomSkipsWithFixedHeightDivs(markdown: any): string {
    markdown = markdown.replace(/\\bigskip/g, "<div style='height: 1.2rem'>&nbsp</div>");
    markdown = markdown.replace(/\\mediumskip/g, "<div style='height: 1rem'>&nbsp</div>");
    markdown = markdown.replace(/\\smallskip/g, "<div style='height: 0.8rem'>&nbsp</div>");
    return markdown;
  }
}
