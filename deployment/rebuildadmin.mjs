#!/usr/bin/env zx


echo(chalk.blue('Admin project build'))

if("./admin.zip"){
    await $`rm -rf admin.zip`
}

echo("Remove node_modules folder")
await $`rm -rf admin/node_modules`

echo("Remove .next folder")
await $`rm -rf admin/.next`

echo('Install Node For Admin')
await $`yarn --cwd ./admin`

echo('Build Admin')
await $`yarn --cwd ./admin build`

echo(chalk.blue('#Upload admin file to server'))
let username = await question('Enter your server username (ex: ubuntu): ')
let ip_address = await question('Enter server ip address (ex: 11.111.111.11): ')

echo("########### connecting to server... ###########")

echo("Remove node_modules folder")
await $`rm -rf admin/node_modules`

echo("Zipping admin folder")
await $`zip -r admin.zip admin`

echo(chalk.green('admin.zip file created'))

echo("Removing admin.zip and admin to the server, Please wait...")

await $`ssh -o StrictHostKeyChecking=no -l ${username} ${ip_address} "rm -rf /var/www/pixer-laravel/admin.zip /var/www/pixer-laravel/admin";`
// let front_end_source_path = await question('Enter frontend.zip source path (ex: /home/../pixer-laravel/frontend.zip): ')
let front_end_source_path = "./admin.zip";
echo("Uploading admin.zip to server, Please wait...")
await $`scp ${front_end_source_path} ${username}@${ip_address}:/var/www/pixer-laravel`

echo(chalk.green("Uploaded admin.zip to server"))
await $`ssh -o StrictHostKeyChecking=no -l ${username} ${ip_address} "unzip /var/www/pixer-laravel/admin.zip -d /var/www/pixer-laravel";`

echo('Install Node For Admin')
await $`ssh -o StrictHostKeyChecking=no -l ${username} ${ip_address} "yarn --cwd /var/www/pixer-laravel/admin";`

await $`ssh -o StrictHostKeyChecking=no -l ${username} ${ip_address} "pm2 restart all";`;
echo(chalk.green('Your application build and upload successful'))
