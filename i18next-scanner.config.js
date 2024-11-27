module.exports = {
    input: [
      'src/**/*.{js,jsx,ts,tsx}', // Archivos donde buscar las claves de traducción
    ],
    output: './locales', // Carpeta donde se generarán los archivos de traducción
    options: {
      func: {
        list: ['t'], // Funciones que el scanner reconocerá como claves (e.g., useTranslation.t)
      },
      lngs: ['en', 'es'], // Idiomas soportados
      ns: ['translation'], // Namespaces usados (por defecto, "translation")
      defaultLng: 'en', // Idioma por defecto
      defaultNs: 'translation', // Namespace por defecto
      resource: {
        loadPath: '{{lng}}/{{ns}}.json', // Ruta de los archivos de traducción
        savePath: '{{lng}}/{{ns}}.json', // Ruta de guardado de traducciones
      },
      keySeparator: false, // No usa separador para claves (p.ej., "home.title")
      namespaceSeparator: false, // No usa separador para namespaces
    },
  };
  