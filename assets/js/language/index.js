const paths = {
	"en": "/assets/js/language/texts/en-GB.json",
	"fr": "/assets/js/language/texts/fr.json"
}

const unitList = ["min-read-text"]

const languageSelect = document.getElementById('language-select');

const languageSet = {
	false: "fr",
	true: "en",
	"fr": false,
	"en": true
}

const debug = true;


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


function loadTexts(languageTexts, language) {
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
}


function retrieve_texts(language) {
	const promises = Object.values(paths).map(path => fetch(path));
	Promise.all(promises)
	.then(responses => Promise.all(responses.map(response => response.json())))
	.then(data => {
		let languageTexts = {"fr": data[1], "en": data[0]};
		loadTexts(languageTexts, language);
		localStorage.setItem("languageTexts", JSON.stringify(languageTexts));
	})
	.catch(error => console.log(error));
}


function fetch_texts(language) {
	/* If debug is enabled, retrieve texts from the server else try to get it from local storage */
	if (debug) {
		retrieve_texts(language);
	} else {
		var cachedData = localStorage.getItem("languageTexts");
		if (cachedData) {
			let languageTexts = JSON.parse(cachedData);
			loadTexts(languageTexts, language);
		} else {
			retrieve_texts(language);
		}
	}
}

languageSelect.addEventListener('change', function () {
	setLangCookie(languageSet[languageSelect.checked]);
});

window.addEventListener('load', function () {
	const language = setLangCookie();
	languageSelect.checked = languageSet[language];
});
