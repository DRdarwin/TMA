import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    console.log('📡 Нове підключення WebSocket');
    
    ws.send(JSON.stringify({ message: '🔗 З’єднання встановлено' }));

    ws.on('message', (data: string) => {
        console.log('📩 Отримано від клієнта:', data);
    });

    ws.on('close', () => {
        console.log('❌ Клієнт відключився');
    });
});

console.log('🚀 WebSocket-сервер запущено на ws://localhost:8080');
