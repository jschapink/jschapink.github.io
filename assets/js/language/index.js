const paths = {
	"en": "/assets/js/language/texts/en.json",
	"fr": "/assets/js/language/texts/fr.json"
}

const unitList = ["min-read-text"]

const languageSelect = document.getElementById('language-select');

function setLangCookie(changeLanguage) {
	const langCookie = Cookies.get('lang');
	const url = new URL(location);
	const searchParamsLang = url.searchParams.get('lang');

	let language = changeLanguage ? changeLanguage : searchParamsLang ? searchParamsLang : langCookie;

	if (language != "fr" && language != "en") {
		language = "fr";
	}

	fetch_texts(language);

	url.searchParams.set('lang', language);
	history.pushState({}, "", url);

	if (langCookie !== language) {
		Cookies.set('lang', language, { expires: 7 });
	}
	console.log(`Lang Cookie: ${language}`);

	return language;
}

function add_text_content(languageTexts, language, key, textContent) {
	let text = languageTexts[language][key];
	if (text === "" || text === null || text === undefined) {
		if (language === "fr") {
			text = languageTexts["en"][key];
		}
		else if (language === "en") {
			text = languageTexts["fr"][key];
		}
		else {
			console.log(`Error: Key not found in language texts ${key}`);
		}
		return text;
	}

	if (unitList.includes(key) && textContent !== "" && textContent !== null && textContent !== undefined) {
		let value = "";
		for (let lang in languageTexts) {
			let split_content_ws = textContent.split(" ");
			let split_key_ws = languageTexts[lang][key].split(" ");

			for (let i in split_content_ws) {
				if (!split_key_ws.includes(split_content_ws[i])) {
					value = split_content_ws[i];
					break;
				}
			}
		}
		return value + " " + text;
	}
	return text;
}

function fetch_texts(language) {
	const promises = Object.values(paths).map(path => fetch(path));
	Promise.all(promises)
		.then(responses => Promise.all(responses.map(response => response.json())))
		.then(data => {
			let languageTexts = {"fr": data[1], "en": data[0]};
			let selectedTexts = languageTexts[language];

			for (const key in selectedTexts) {
				const elements = document.getElementsByClassName(key);
				if (elements.length > 0) {
					for (let i in elements) {
						if (elements[i] && i !== "length") {
							elements[i].innerHTML = add_text_content(languageTexts, language, key, elements[i].textContent);
						}
					}
				} else {
					const element = document.getElementById(key);
					if (element) {element.innerHTML = add_text_content(languageTexts, language, key, element.textContent);};
				}
			}
		})
		.catch(error => console.log(error));
}

languageSelect.addEventListener('change', function () {
	if (languageSelect.checked) {
		setLangCookie("fr");
	}
	else {
		setLangCookie("en");
	}
});

window.addEventListener('load', function () {
	const language = setLangCookie();

	if (language === "fr") {
		languageSelect.checked = true;
	}
	else {
		languageSelect.checked = false;
	}
});
