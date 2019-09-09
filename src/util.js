import React from 'react';

export default function generateRows(nColumns, contents, divClassName) {
    const nFullRows = Math.floor(contents.length / nColumns);
    const rows = [];

    let i = 0;

    while (i <= nFullRows) {
        let rowContent;

        if (i < nFullRows) {
            rowContent = contents.slice((i * nColumns), (i + 1) * nColumns);
        } else {
            rowContent = contents.slice((i * nColumns));
        }

        rows.push(<div className={divClassName} key={i}>
            {rowContent}
        </div>);

        i += 1;
    }

    return (
        <div>
            {rows}
        </div>
    );
}
