import { WagmiConfig, configureChains, createConfig } from "wagmi";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { goerli } from "wagmi/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { HydrationProvider } from "react-hydration-provider";
import { useEffect, useState } from "react";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: "bpQ1-T01iTECEK2JaVx3jafYpIvJ9kWY" })]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    hydrated && (
      <HydrationProvider>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </HydrationProvider>
    )
  );
}

export default MyApp;
