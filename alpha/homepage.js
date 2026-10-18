/* Progressive enhancement: all research and publication content is readable without JS. */
(() => {
    const cn = document.documentElement.lang.startsWith('zh');
    const t = (en, zh) => cn ? zh : en;
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    toggle.hidden = false;
    menu.dataset.collapsed = 'true';
    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.dataset.collapsed = 'true';
    };
    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(expanded));
        menu.dataset.collapsed = String(!expanded);
    });
    menu.addEventListener('click', event => {
        if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });

    const controls = document.querySelector('.rule-controls');
    controls.hidden = false;
    document.querySelector('.rule-fallback').hidden = true;
    controls.addEventListener('click', event => {
        const button = event.target.closest('[data-rule]');
        if (!button) return;
        const unanimous = button.dataset.rule === 'unanimity';
        controls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        document.querySelectorAll('.collective-edge').forEach(edge => edge.toggleAttribute('hidden', unanimous));
        document.querySelector('.demo-result').textContent = unanimous
            ? t('No attack is endorsed by all three people, so unanimity leaves no attacks in the collective graph. In this example the cycle disappears, along with every individual attack.', '没有一条攻击关系得到三人共同认可，因此全体一致规则得到的群体图没有攻击关系。在这个例子中，环消失了，个体的攻击关系也都未能保留。')
            : t('Each person’s graph is acyclic. Majority voting creates a cycle in the collective graph: a → b → c → a.', '每个人的论辩图都没有环。多数规则却在群体图中产生了环：a → b → c → a。');
    });

    document.querySelectorAll('.copy-citation').forEach(button => {
        button.hidden = false;
        button.addEventListener('click', async () => {
            const citation = button.closest('.citation');
            const status = citation.querySelector('.copy-status');
            try {
                await navigator.clipboard.writeText(citation.querySelector('code').textContent);
                status.textContent = t('Copied.', '已复制。');
            } catch {
                status.textContent = t('Select the BibTeX above to copy, or download the .bib file.', '请选中上方 BibTeX 复制，或下载 .bib 文件。');
            }
        });
    });

    const search = document.querySelector('.publication-search');
    const input = search.querySelector('input');
    const archive = document.querySelector('#publication-archive');
    const lists = [...archive.querySelectorAll('.archive-list')];
    const entries = lists.flatMap(list => [...list.children]);
    const searchable = entries.map(entry => entry.textContent.toLocaleLowerCase());
    const filter = () => {
        const words = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
        let count = 0;
        entries.forEach((entry, index) => {
            entry.hidden = !words.every(word => searchable[index].includes(word));
            if (!entry.hidden) count++;
        });
        lists.forEach(list => {
            const empty = [...list.children].every(entry => entry.hidden);
            list.hidden = empty;
            if (list.previousElementSibling?.matches('.sub-title')) list.previousElementSibling.hidden = empty;
        });
        document.querySelector('#search-status').textContent = count
            ? t(`${count} of ${entries.length} publications`, `显示 ${count} / ${entries.length} 条成果`)
            : t('No matching publications. Try another title, author, or year.', '没有匹配成果，请尝试其他标题、作者或年份。');
    };
    search.hidden = false;
    input.addEventListener('input', filter);
    search.querySelector('.clear-search').addEventListener('click', () => {
        input.value = '';
        filter();
        input.focus();
    });
    filter();
})();
