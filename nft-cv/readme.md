# Solana Program

1. First, you will need to install [solana tools](https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool), and a wallet ([phantom](https://phantom.app/) is a nice wallet), to run this program.

2. You need to install mocha, ts-mocha, and typescript globally by using the next command.
    ```
    npm install -g mocha ts-mocha typescript
    ```
3. You should install Anchor too:
   ```
   cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
   ```
4. You will need to create a local keypair for development.
   ```
   solana-keygen new
   ```
