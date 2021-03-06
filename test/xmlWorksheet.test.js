'use strict';

import { expect } from 'chai';
import { makeXworksheet, Xworksheet, XsheetData, Xrow, Xc, Xf } from '../src/xmlWorksheet';

describe('Test: xmlWorksheet.js', () => {
  it('should makeXworksheet return Xworksheet', () => {
    const worksheet = makeXworksheet();
    expect(worksheet instanceof Xworksheet).to.be.true;
    expect(worksheet.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetPr filterMode="0"><pageSetUpPr fitToPage="0"/></sheetPr><sheetViews><sheetView colorId="64" defaultGridColor="1" rightToLeft="0" showFormulas="0" showGridLines="1" showOutlineSymbols="1" showRowColHeaders="1" showZeros="1" tabSelected="0" topLeftCell="A1" view="normal" windowProtection="0" workbookViewId="0" zoomScale="100" zoomScaleNormal="100" zoomScalePageLayoutView="100"><selection activeCell="A1" activeCellId="0" pane="topLeft" sqref="A1"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="12.85"/><printOptions gridLines="0" gridLinesSet="1" headings="0" horizontalCentered="0" verticalCentered="0"/><pageMargins left="0.7875" right="0.7875" top="1.05277777777778" bottom="1.05277777777778" header="0.7875" footer="0.7875"/><pageSetup blackAndWhite="0" cellComments="none" copies="1" draft="0" firstPageNumber="1" fitToHeight="1" fitToWidth="1" horizontalDpi="300" orientation="portrait" pageOrder="downThenOver" paperSize="9" scale="100" useFirstPageNumber="1" usePrinterDefaults="0" verticalDpi="300"/><headerFooter><oddHeader>&amp;C&amp;"Times New Roman,Regular"&amp;12&amp;A</oddHeader><oddFooter>&amp;C&amp;"Times New Roman,Regular"&amp;12Page &amp;P</oddFooter></headerFooter></worksheet>');
  });

  it('should XsheetData render', () => {
    const sheetData = new XsheetData();
    const row1 = new Xrow({
      r: 1,
      ht: 13,
      customHeight: 1
    });
    const row2 = new Xrow({
      r: 2,
      ht: 30,
      customHeight: 1
    });
    const c1 = new Xc({ r: 'A1', s: 2, t: 's' });
    c1.v = '3';
    const c2 = new Xc({ r: 'A2', s: 3, t: 's' });
    c2.v = 4;
    const c3 = new Xc({ r: 'B2', s: 3, t: 's' });
    c3.f = new Xf({}, ['SUM(B5:B13)']);

    row1.children = [c1];
    row2.children = [c2, c3];

    sheetData.children = [row1, row2];
    expect(sheetData.render()).to.equal('<sheetData><row r="1" ht="13" customHeight="1"><c r="A1" s="2" t="s"><v>3</v></c></row><row r="2" ht="30" customHeight="1"><c r="A2" s="3" t="s"><v>4</v></c><c r="B2" s="3" t="s"><f>SUM(B5:B13)</f></c></row></sheetData>');
  });
});
