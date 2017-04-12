var socket = io.connect();
var streamId = window.location.pathname.substring(1);
var autoScrool = true;

window.onscroll = function(e) {
  autoScrool = (
    (window.innerHeight + window.scrollY) >= document.body.offsetHeight
  );
};

socket.on('log', function(data) {
  if (data.streamId === streamId) {
    if (data.format === 'json') {
      var p = document.createElement('p');

      var d = document.createElement('div');
      d.className = 'tags';

      var s1 = document.createElement('span');
      s1.className = 'date';
      s1.innerHTML = (new Date()).toLocaleDateString(
        'en-GB',
        {hour: '2-digit', minute: '2-digit', second: '2-digit'}
      );
      d.appendChild(s1);

      var s2 = document.createElement('span');
      s2.className = 'ip';
      s2.innerHTML = data.ip;
      d.appendChild(s2);

      var c = document.createElement('code');
      c.className = 'blink';
      c.innerHTML = JSON.stringify(data.data);

      p.appendChild(d);
      p.appendChild(c);
      document.getElementById('root').appendChild(p);
      if (autoScrool === true) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  }
});
