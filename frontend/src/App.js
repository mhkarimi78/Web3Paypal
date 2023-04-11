import "./App.css";
import logo from "./logo.png";
import { Layout, Button } from "antd";
import CurrentBalance from "./componets/CurrentBalance";
import RequestAndPay from "./componets/RequestAndPay";
import AccountDetails from "./componets/AccountDetails";
import RecentActivity from "./componets/RecentActivity";

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="headerLeft">
            <img src={logo} alt="logo" className="logo" />
            <>
              <div
                className="menuOption"
                style={{ borderBottom: "1.5px solid black" }}
              >
                Summary
              </div>
              <div className="menuOption">Activity</div>
              <div className="menuOption">{`Send & Request`}</div>
              <div className="menuOption">Wallet</div>
              <div className="menuOption">Help</div>
            </>
          </div>

          <Button type={"primary"}>Connect Wallet</Button>
        </Header>
        <Content className="content">
          <div className="firstColumn">
            <CurrentBalance />
            <RequestAndPay />
            <AccountDetails />
          </div>
          <div className="secondColumn">
            <RecentActivity />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
