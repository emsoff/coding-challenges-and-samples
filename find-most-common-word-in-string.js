(() => {
    const counter = {};
    const subject = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa vitae tortor condimentum lacinia quis vel eros donec. Ante in nibh mauris cursus mattis molestie a iaculis at. Suspendisse sed nisi lacus sed viverra tellus. Et netus et malesuada fames ac turpis. Donec pretium vulputate sapien nec sagittis. Varius vel pharetra vel turpis nunc eget. Amet cursus sit amet dictum sit amet justo. Tempor nec feugiat nisl pretium. Tempor nec feugiat nisl pretium fusce id velit. Sed cras ornare arcu dui vivamus arcu felis. Mi in nulla posuere sollicitudin. Sem viverra aliquet eget sit amet.\
    Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Ipsum a arcu cursus vitae congue. Orci ac auctor augue mauris. Nulla pellentesque dignissim enim sit amet venenatis urna. Sed viverra ipsum nunc aliquet bibendum. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Libero id faucibus nisl tincidunt eget. In fermentum et sollicitudin ac orci phasellus egestas. Mi eget mauris pharetra et ultrices. Felis eget velit aliquet sagittis id. Integer eget aliquet nibh praesent tristique magna sit amet. Tellus pellentesque eu tincidunt tortor aliquam. Nec tincidunt praesent semper feugiat nibh sed.\
    Velit laoreet id donec ultrices tincidunt arcu non sodales neque. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. A diam sollicitudin tempor id eu nisl. A pellentesque sit amet porttitor eget dolor morbi non. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Amet porttitor eget dolor morbi non arcu. Nunc congue nisi vitae suscipit tellus mauris a. Mi proin sed libero enim sed faucibus. Elementum curabitur vitae nunc sed velit. Tellus in metus vulputate eu scelerisque felis. Sagittis nisl rhoncus mattis rhoncus urna. Viverra nibh cras pulvinar mattis nunc sed. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Odio morbi quis commodo odio aenean sed adipiscing. Cursus sit amet dictum sit amet justo donec enim. Vivamus arcu felis bibendum ut tristique et. Lacus suspendisse faucibus interdum posuere lorem ipsum. Faucibus vitae aliquet nec ullamcorper sit.\
    Mattis enim ut tellus elementum. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Adipiscing elit duis tristique sollicitudin. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Id interdum velit laoreet id donec ultrices tincidunt. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Blandit libero volutpat sed cras ornare arcu dui vivamus. Diam quis enim lobortis scelerisque. Faucibus nisl tincidunt eget nullam non nisi. Duis convallis convallis tellus id interdum velit laoreet id donec. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Quis vel eros donec ac odio.\
    Ut ornare lectus sit amet est placerat in egestas. Ullamcorper dignissim cras tincidunt lobortis. Ligula ullamcorper malesuada proin libero. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Penatibus et magnis dis parturient montes nascetur ridiculus. Et leo duis ut diam quam. Purus semper eget duis at tellus at urna. Ultrices eros in cursus turpis massa tincidunt dui. Habitant morbi tristique senectus et netus. Tristique senectus et netus et malesuada fames ac turpis egestas. Nunc id cursus metus aliquam. Semper feugiat nibh sed pulvinar proin gravida. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Laoreet id donec ultrices tincidunt arcu non. Proin libero nunc consequat interdum varius sit amet. Tristique magna sit amet purus gravida quis blandit. At lectus urna duis convallis. Lectus quam id leo in vitae turpis massa sed. Ac tortor dignissim convallis aenean.'
    // console.log(subject)
    const words = subject.toLowerCase().replace(/[^a-zA-Z0-9_-] /g, ' ').split(' ');
    words.forEach(word => {
        if(counter[word]) {
            counter[word] = counter[word]+1
        } else {
            counter[word] = 1;
        }
    })
    const mostCommon = Object.entries(counter)
    mostCommon.sort((a,b) => {
        return a[1] > b[1] ? -1 : 1
    })

    console.log(`The most common word is '${mostCommon[0][0]}' with ${mostCommon[0][1]} instances`)

})()