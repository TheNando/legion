// Run on http://gemsofwar.com/game-guide-troop-list/ to gather troop data

function extractFrom (s0, s1, s2) {
    var start = s0.indexOf(s1) + s1.length;
    var end = s0.indexOf(s2, start);
    return start < 0 || end < 0 ? s0 : s0.substring(start, end).trim()
}

var cards = Array.from(document.querySelectorAll('table[bgcolor="#BBBBBB"]'));
cards.map((card, index) => {
    var name = card.querySelector('h2').innerText;
    var tempInfo = card.querySelector('b').innerText;
    var rarity = extractFrom(tempInfo, '(', 'Troop');
    var home = extractFrom(tempInfo, 'from', ')');

    var stats = {
        life: [],
        attack: [],
        armor: [],
        magic: []
    };

    var image = card.querySelector('td[valign] img').src;
    var spellEl = card.querySelector('table table table table td b');

    var spell = {
        name: spellEl.innerText,
        cost: Number(extractFrom(spellEl.nextSibling.textContent, 'Cost:', ' ')),
        description: card.querySelector('td[width="500"]').innerText,
        image: card.querySelector('td[align] img').src,
        mana: []
    };

    var colors = Array.from(card.querySelectorAll('font'));
    colors.shift();
    while(colors.length) {
        spell.mana.push(colors.pop().innerText.toLowerCase());
    }

    Array
        .from(card.querySelectorAll('table table table tbody tr'))
        .forEach(e => {
            if (e.innerText.indexOf('\n') > 0) {
                return;
            }

            var ary = e.innerText.split('\t');
            var stat = ary.shift().replace(':', '').toLowerCase();
            if (stat === 'l1') {
                return;
            }
            while (ary.length) {
                stats[stat].push(Number(ary.shift()));
            }
        });

    return {
        id: index,
        name: name,
        rarity: rarity,
        home: home,
        image: image,
        stats: stats,
        spell: spell
    };
});
