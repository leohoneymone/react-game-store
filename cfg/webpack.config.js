const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        mode: argv.mode || 'development',

        devtool: isProd ? false : 'source-map',

        entry: path.resolve(__dirname, '../src/index.js'),

        output: {
            path: path.resolve(__dirname, '../build/'),
            filename: 'index.js',
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },

        module: {
            rules: [
                // React + TS
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'babel.config.js'),
                        }
                    }
                },

                // CSS
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },

                // SASS
                {
                    test: /\.(sass|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },

                // Assets 
                {
                    test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                    type: 'asset/resource'
                },
            ]
        },

        plugins: [
            // HTML webpack plugin
            new HtmlWebpackPlugin({
                title: "CLD GAME STORE",
                favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
                meta: {
                    viewport: 'width=device-width, initial-scale=1',
                    description: "My Awesome Webpack App"
                },
                template: path.resolve(__dirname, '../src/index.html'),
                filename: 'index.html',
            }),

            // dotenv plugin (.env)
            new DotenvWebpackPlugin({
                path: './.env',
                safe: true,
                systemvars: true,
                silent: false,
                defaults: './.env.local',
            }),
        ],

        devServer: isProd ? undefined : {
            port: 3000,
            hot: true,
            open: true,
            compress: true,
        }
    }
}