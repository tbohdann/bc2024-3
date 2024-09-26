const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'Input JSON file path')
  .option('-o, --output <path>', 'Output file path')
  .option('-d, --display', 'Display output in console');

program.parse(process.argv);

const options = program.opts();

// Перевірка наявності обов'язкового параметра -i
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// Перевірка, чи існує файл для читання
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

// Читання JSON
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));
let result = data.map(entry => `${entry.StockCode}-${entry.ValCode}-${entry.Attraction}`).join('\n');

// Виведення в консоль, якщо задано параметр --display
if (options.display) {
  console.log(result);
}

// Запис у файл, якщо задано параметр --output
if (options.output) {
  fs.writeFileSync(options.output, result);
}

// Якщо не задано ні --display, ні --output, програма нічого не робить
if (!options.display && !options.output) {
  
}
