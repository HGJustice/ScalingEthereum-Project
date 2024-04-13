import { useAccount } from "@particle-network/connect-react-ui";
import CustomConnectButton from "./Components/CustomConnectButton.js";

export const App = () => {
  const account = useAccount();

  return (
    <div>
      <CustomConnectButton />
      {account && (
        <div>
          <p>hi</p>
        </div>
      )}
    </div>
  );
};

export default App;
