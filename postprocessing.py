import os

inject_js_path = os.path.join('dist', "inject.js")

with open(inject_js_path, "r") as f:
    original_content = f.read()

metadata = """\
// ==UserScript==
// @name         eHunter-vopaaz
// @description  Modifies several default settings for https://github.com/hanFengSan/eHunter to use in incognito
// @copyright    2023, Vopaaz
// @license      MIT
// @version      2.7.3.5
// @author       Vopaaz
// @match        https://exhentai.org/*
// @match        https://e-hentai.org/*
// @match        https://nhentai.net/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

"""

full_content = metadata + original_content

with open(inject_js_path, "w") as f:
    f.write(full_content)
