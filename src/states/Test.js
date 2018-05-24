import throttle from 'lodash.throttle';
import PhaserInput from 'phaser-input';
import io from 'socket.io-client';

export default class Test extends Phaser.State {

    onMysqlChangeText (data) {
        console.log("MySQL test received");
        console.log(data);
        Test.texts.mysql2_text.setText (data.username);
    }

    preload() {
        Test.graphic_size = [];
        Test.graphic_size.logo = [];
        Test.graphic_size.logo.x = 140;
        Test.graphic_size.logo.y = 55;

        Test.graphic = [];
        Test.input = [];
        Test.texts = [];
        
        Test.connection = [];
        Test.connection.socket = io.connect("http://localhost:7788");
    }

    /**
     * Setup all objects, etc needed for the main game state.
     */
    create() {
        Test.graphic.logo = this.add.image(game.world.centerX- Test.graphic_size.logo.x/2, 200, 'login/magica_logo');
        window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);
        this.game.plugins.add(PhaserInput.Plugin);
        Test.input.cred = this.game.add.inputField(game.world.centerX-125, 320, { 
            width: 250,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Username or Email'
        });
        Test.input.password = this.game.add.inputField(game.world.centerX-125, 350, { 
            width: 250,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Password'
        });
        
        Test.texts.mysql_text = this.add.text(100, 200, "Testtext", { font: 'Arial', fontSize: 28, fill: '#ff0000' });
        Test.texts.mysql2_text = this.add.text(100, 250, "MySQLtest", { font: 'Open Sans', fontSize: 28, fill: '#ff0000' });

		Test.connection.socket.on("mysql_change_text", this.onMysqlChangeText); 
        Test.connection.socket.emit('mysql_test', {});
    }
  
    /**
     * Resize the game to fit the window.
     */
    resize() {
        const width = window.innerWidth * window.devicePixelRatio;
        const height = window.innerHeight * window.devicePixelRatio;
    
        this.scale.setGameSize(width, height);
        
        Test.graphic.logo.x = this.world.centerX- this.graphic_size.logo.x/2;
        Test.input.cred.x = game.world.centerX-125;
        Test.input.password.x = game.world.centerX-125;
    }
  
    /**
     * Handle actions in the main game loop.
     */
    update() {
        Test.connection.socket.on('connect', function() {
            // console.log('check 2', Test.connection.socket.connected);
        });
    }
  }
  