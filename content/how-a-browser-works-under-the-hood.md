step by step process of how browser works under the hood

1. when we enter url in the browser
    - DNS lookup starts resolving DNS name(www.google.com) into its corresponding ip address(for example 91.124.94.99)
    - (DNS names are human readable, while ip address are machine-readable)
    - TCP(transmisssion control protocol) connection is established using three-way-protocol(SYN, SYN-ACK, ACK)

2. fetching data
    - browser sends request to the server
    - server responds with a requested page(html, css and javascript, images etc)

3. parsing
    - browser starts parsing the html document as soon as a the first chunk arrives, even before the full file is downloaded.
    - creates DOM(document object model) from html and CSSOM(cascading style sheet object model) from css
    - both trees are combined into render, that determines what to display on the page

4. preloading
    - identifies high-priority resources

5. javascript execution
    - javascript interpreter parse and executes scripts
    - it may modifies the DOM or CSSOM
    - it can cause re-rendering some parts of the page

6. rendering
    - calculates layout
    - determines exact size and position of every element
    - page is then painted to the screen

7. user interaction
    - user can now interact with the page