const WhatsAppWeb = require('baileys')

const client = new WhatsAppWeb() 

// CONECTA WHATS - SERVIDOR
module.exports.conectApi = async (req, res) => {
        client.connect()
        .then (([user, chats, contacts, unread]) => {
            res.jsonp({mensaje: 'Autenticación exitosa'});
        })
        .catch (err => console.log(err) )
}


// ENVIAR MENSAJES

module.exports.sendMessage = async (req, res) => {
    options = {
        quoted: null,
        timestamp: new Date()
    }
    client.sendTextMessage(`${req.body.phone}@s.whatsapp.net`, req.body.body, options)
    .then( res.jsonp({mensaje:'Notificación enviada'}))
}