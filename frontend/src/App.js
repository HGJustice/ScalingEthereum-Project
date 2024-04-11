import "@particle-network/connect-react-ui/dist/index.css";
import { ConnectButton } from "@particle-network/connect-react-ui";

export const App = () => {
  return (
    <ConnectButton.Custom>
      {({ account, openAccountModal, openConnectModal, openChainModal }) => (
        <div>
          {/* The connect button is always visible but disabled when there is an account */}
          <button onClick={openConnectModal} disabled={!!account}>
            Open Connect
          </button>

          {account && ( // This section will only render if `account` is truthy (i.e., the user is logged in)
            <>
              <br />
              <br />
              {/* Open Account button */}
              <button onClick={openAccountModal}>Open Account</button>
              <br />
              <br />
              {/* Open Switch Network button */}
              <button onClick={openChainModal}>Open Switch Network</button>
            </>
          )}

          {/* Displaying account information */}
          <div>
            <h3>Account</h3>
            <p>{account || "Not logged in"}</p>
          </div>
        </div>
      )}
    </ConnectButton.Custom>
  );
};

export default App;
