# Purchase Power Comparison App

This React application lets you compare the purchasing power of an amount of money across two dates. It uses inflation, exchange rate and gold price data to convert between TRY, USD and EUR as well as the value in grams of gold or in units of the minimum wage.

## Data

The dataset is provided in an Excel file `public/data/CPIAUCSL.xlsx`. During development an Express server serves this file as JSON from `/api/data`. Two helper scripts are available if you need to regenerate the JSON manually:

- `src/util2.js` – converts the Excel file to JSON (`src/output.json`).
- `src/util.js` – rounds numeric values and writes the processed JSON (`src/output.json`).

You can run these scripts with Node:

```bash
node src/util2.js    # convert the Excel sheet to JSON
node src/util.js     # format the numbers
cp src/output.json public/data/data.json
```

## Running the project

Install dependencies and start the development server:

The project uses Yarn 4. The included `.yarnrc.yml` configures Yarn to
create a traditional `node_modules` folder. This is required so that
`react-scripts` can find its ESLint configuration.

```bash
yarn install
yarn start
```

To start the API server run:

```bash
yarn server
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

To create a production build use:

```bash
yarn build
```

The build output will be placed in the `build/` directory and can be deployed to services like Netlify (see `netlify.toml`).

## Usage

Choose a base currency (TRY or USD), a start date, an end date and an amount. The **ComparisonTable** component will then show how that amount translates into different currencies, gold and the minimum wage at the selected dates. The calculations are handled in `src/utils/calculateValues.js`.

The app's main building blocks can be found in `src/components`:

- `DataForm` and `Filters` collect user selections
- `ComparisonTable` displays the converted values in table form
- `TrendChart`, `ComparisonChart`, `DataChart` and `Graph` visualise the data in different ways

These components can be customised or extended as needed.

