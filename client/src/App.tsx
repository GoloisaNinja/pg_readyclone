import React, {useState} from 'react';
import axios from 'axios';
import styles from './App.module.scss';

type Player = {
    class_name: string,
    created_on: string,
    from_region: string,
    id: number,
    last_login: string | null,
    player_name: string,
    starting_hp: number,
    starting_max_inventory: number,
    starting_mp: number,
}
function App() {
    const emptyPlayer: Player = {
        class_name: "",
        created_on: "",
        from_region: "",
        id: 0,
        last_login: null,
        player_name: "",
        starting_hp: 0,
        starting_max_inventory: 0,
        starting_mp: 0
    }
    const [player, setPlayer] = useState<Player>(emptyPlayer);
    const [message, setMessage] = useState<string>("Get an avatar to see detail grid");
    const getAvatar = async () => {
        const randomID = Math.floor(Math.random() * 4) + 1;
        try {
            const res = await axios.get(`/api/v1/player/${randomID}`)
            setPlayer(res.data[0])
        } catch(e: any) {
            console.log(e)
            setMessage(e.message);
        }
    }
  return (
    <div className="App">
      <header className={styles.app_header}>
          <h1>Ready Player <span className={styles.header_span}>One</span></h1>
          <h2>The OASIS awaits - click "get an avatar" below to begin</h2>
          <button
              onClick={() => getAvatar()}
          >get an avatar</button>
      </header>
        {player.id !== 0 ? (
            <main className={styles.app_main}>
                <div className={styles.player_detail_container}>
                    <h3>Avatar Detail Grid</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Detail</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Id</td>
                            <td>{player.id}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{player.player_name}</td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td>{player.class_name}</td>
                        </tr>
                        <tr>
                            <td>OASIS Region</td>
                            <td>{player.from_region}</td>
                        </tr>
                        <tr>
                            <td>Base Hit Points</td>
                            <td>{player.starting_hp}</td>
                        </tr>
                        <tr>
                            <td>Base Magic Points</td>
                            <td>{player.starting_mp}</td>
                        </tr>
                        <tr>
                            <td>Base Inventory Cap</td>
                            <td>{player.starting_max_inventory}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        ) : (
            <div className={styles.app_empty}>
                <h3>{message}</h3>
            </div>
        )}

    </div>
  );
}

export default App;
