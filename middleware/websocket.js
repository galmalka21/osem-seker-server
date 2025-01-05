const WebSocket = require('ws');
const cron = require('node-cron');
const sql = require('../mssql');

module.exports = function (server) {
  const wss = new WebSocket.Server({ server });

  async function getActiveQuestion() {
    try {
      const result = await sql.pool
        .request()
        .execute('IsQon');
        
        
      if (result.recordset && result.recordset.length > 0) {
        const question = result.recordset[0];
        
        return question;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching active question:', error);
      return null;
    }
  }

  function broadcast(data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  wss.on('connection', async (ws) => {
    console.log('WebSocket client connected');
    const activeQuestion = await getActiveQuestion();
    ws.send(JSON.stringify({ type: 'INITIAL_QUESTION', data: activeQuestion }));

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  cron.schedule('* * * * * *', async () => {
    try {
      const activeQuestion = await getActiveQuestion();
  
      broadcast({ type: 'UPDATE_QUESTION', data: activeQuestion });
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });
  
};
