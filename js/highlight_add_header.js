jQuery(document).ready(() => {
    let $ja2pycHljsArr = $(document).find('div.ja2pyc-hljs');

    $ja2pycHljsArr.each((ja2pycHljsIndex, ja2pyHljs) => {
        // Set Hljs Header
        let hljsHeader = document.createElement('div');
        hljsHeader.className = 'hljs-header'
        ja2pyHljs.insertBefore(hljsHeader, ja2pyHljs.firstChild)

        // Get Hljs Code
        let $codeHljs = $(ja2pyHljs).find('code.hljs');

        // Set Header Language
        let headerLanguage = document.createElement('div');
        headerLanguage.className = 'header-language';
        headerLanguage.textContent = 'JA2PYC';
        hljsHeader.appendChild(headerLanguage);

        // Check Language Type
        let hljsClassList = $codeHljs.prop('classList');
        console.log(hljsClassList);
        console.log($(hljsClassList));
        Array.from(hljsClassList).forEach((classValue) => {
            let regExp = /language-/;
            if (regExp.test(classValue)) {
                headerLanguage.textContent = String(classValue).toUpperCase();
            }
        });

        // Set Header Copy Button
        let headerButton = document.createElement('div');
        headerButton.className = 'header-button';
        hljsHeader.appendChild(headerButton);

        let buttonCopy = document.createElement('div');
        buttonCopy.className = 'button-copy';
        buttonCopy.textContent = 'Copy';
        headerButton.appendChild(buttonCopy);
    });

    // Set Click Copy Event
    $ja2pycHljsArr.on('click', '.button-copy', (event) => {
        let $parentContainer = $(event.currentTarget).closest('div.ja2pyc-hljs');
        let $hljsLnCode = $parentContainer.find('td.hljs-ln-code');

        // Get Copy Text
        let codeText = '';
        $hljsLnCode.each((index, lnCode) => {
            codeText += lnCode.innerText;
            if (index < $hljsLnCode.length - 1) {
                codeText += '\n';
            }
        });

        // Write Clipboard
        if (codeText) {
            navigator.clipboard.writeText(codeText)
                .then(() => {
                    event.currentTarget.textContent = 'Copied';
                })
                .catch((error) => {
                    event.currentTarget.textContent = 'Fail';
                })
                .finally(() => {
                    setTimeout(() => {
                        event.currentTarget.textContent = 'Copy'
                    }, 1000);
                })
        }
    });
});