class plib {
  constructor(extID) {
    if (extID == null) throw new Error("extID must be provided!");
    this.extID = extID;

    this.translations = {}
    this.translations.metadata = {}

    this.translations.register = (
      languageCode = "en",
      languageEnglish = "English",
      languageNative = "English",
      translationData = {}
    ) => {
      if ((Object.prototype.hasOwnProperty.call(
        this.translations.metadata,
        languageCode
      ))) return false;

      this.translations.metadata[languageCode] = {
        languageEnglish: languageEnglish,
        languageNative: languageNative,
        stringCount: Object.keys(translationData).length
      };

      this.translations[languageCode] = translationData;
      return true;
    }

    this.translations.code = (name = "English") => {
      if (name.length === 2)
        return (Object.prototype.hasOwnProperty.call(
          this.translations,
          name
        )) ? name : null;
      let values = Object.values(this.translations.metadata);
      let lang = values.filter(element => {
        return element.languageEnglish === name ||
          element.languageNative === name;
      });

      if (lang.length === 0) return null;
      return Object.keys(this.translations.metadata)[
        Object.values(this.translations.metadata)
          .indexOf(lang[0])];
    }

    this.translations.get = (
      locale = "en",
      key = null
    ) => {
      if (locale == null || key == null) return "";

      let def = this.translations.en[key] == null ? key : this.translations.en[key];

      let languageCode = this.translations.code(locale);
      if (languageCode == null) return def;

      if (!Object.prototype.hasOwnProperty.call(
        this.translations,
        languageCode
      )) return def;
      if (this.translations[languageCode][key] == null) return def;

      return this.translations[languageCode][key];
    }

    this.store = {};
    this.store.get = (key) => {
      if (key == null) return null;
      if (Scratch.vm.runtime.extensionStorage[this.extID] == null) {
        Scratch.vm.runtime.extensionStorage[this.extID] = {};
        return undefined;
      }
      // i hate eslint/ts-ignore/whatever was angering me
      if (!Object.prototype.hasOwnProperty.call(
        Scratch.vm.runtime.extensionStorage[this.extID],
        key
      )) {
        return undefined;
      }

      return Scratch.vm.runtime.extensionStorage[this.extID][key];
    }
    this.store.set = (key, value) => {
      if (key == null || value == null) return;
      if (Scratch.vm.runtime.extensionStorage[this.extID] == null)
        Scratch.vm.runtime.extensionStorage[this.extID] = {};

      Scratch.vm.runtime.extensionStorage[this.extID][key] = value;
      return 1;
    }

    this.extension = null;
  }
}
