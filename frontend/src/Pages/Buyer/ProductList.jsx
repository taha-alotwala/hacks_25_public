import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyProducts = [
    {
        _id: "679a1ecc417e272ebc43fb2b",
        name: "Lettuce",
        price: 73,
        harvest_date: "2024-12-02T18:30:00.000Z",
        organic: false,
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExQWFRUVGBobGBYXGBcdFxkbGBgXGBcaGBkYHSggGx0lGxcZIjEhJikrLi4vGCAzODMtNygtLisBCgoKDg0OGxAQGzglICUvLTU1NS0tLS0tLy8tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMMBAwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcCAQj/xAA7EAABAwIFAQYFAgUEAQUAAAABAAIRAyEEBRIxQVEGEyJhcYEykaGxwUJSByPR4fBicoKSFBUWM6Lx/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EAC0RAAICAQQBAwIEBwAAAAAAAAABAgMRBBIhMUETIlEFYYGRsfAUMjNx0eHx/9oADAMBAAIRAxEAPwDuKIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiLT+3XaYUGGkw/zXCLG7Qd3Hp5eaquujVHcyM5KKyzcEXL8g7cnD0W03s7zTMHUQ6CZuSDtK3ns72gpYthcyWlvxMduPO24VVGrrtwk+fgjC2Mi3REWosCIiAIiIAiIgCIiAIiID4i+ogCIiAIiIAiIgCIiAIiIAiIgCrsxzqlRe2m4kvcJDWiTHU8AeqsVzrt7ljqbxVa4lrzz+6Np9Bb0Ky6u2dUN0F/orsk4xyjYcb2ieWnuWDUNtfPs3n3VB/7+rCzqdMnn4h+bKgoZg4DcyFgxY1t7zS3o6Zmett529vNePdqrv5oz/QyTtk+UyfnPb+vUBFMikJ/SL/9j9xC044gPeSXSTuTz6kqxdgqbgRpHWxI/Mc9FGOX0ALOMnkvE/KIWZ3+pzJtsoc88tkmhRmNUD3F/kr5maCm3RT03G9oB8xutdwGEa4HTUc4g2ht9r2m4FueVlq0XCSDqEEngyOoKr3YfBxSZsD+07w5hNUgt/Z8NuDwR7LpGHz3DPEsr0nej2/aZXAK2IPBkwfS6lZLixTdqLZi0gfDPIXoafUzpTzzkvrvcT9B0qrXCWkEeRB+y9rkeQZ0/vHOovIJ3Bi4823n1XVsHUc5jS8aXEXHRerptSrvGGbK7N5mREWosCIiAIiIAiIgCIiAIiIAiIgCpsz7RU6L9GlzjMOjj57q4e4AEkwBclc97Q5zSq1ppQdG5H64/ptKx6y91QzF4ZVbPauC97Rdr6eGIaBrJbq3gCduFr2X/wASXGp/NpNFM/sJ1D5mD9Frub5U86ng6gYjytYfRUuCwdSoLNgTEusLdJ3j3Xl2a27dnODJO+eeDtWD7U4So4tFZoI/d4ZnoTYq3Y8ESCCDsRsuSZLkdGJqFxd5PgT5QNluPZ19Ok8ta86IjTqloJgjfZaaPqW6SjPHPkurvbeJG2IipMz7TUaRLbudEgCwP/Lp6TsvTsthWszeDTKSj2Xa03+JeZMbh+5kankGOQGmQfmB8lr2bZy+s8uNQD9rQXhrfS1z5lURwL6j9TgSNzcFzvIQT/ZeNf8AVVOLjGOF8v8AwZLL200kQXY0MDdQJJ3jpwVOxeNa3Ckzeo4aRFyAWkkjpIhSq9CnSZ3lQMkfCABMxYC31lU2ExPeFzngOmRB5BEQvMhNPlLgzJYKzE1nkWBi8loMe5CrmvJgDqRA81ttavBGmwiwnbyC8HCSWVmNDqgb5AatToc6YkgdfLoroXJcNBJdGKoBSpNpg+ICXdZNz/T2WWhLhMjVzMgH1IBv7KGMLUBks1E7+IEn5FfMXhMUBq7pzWTFrkTtqAMj3UHHf0yPPwR62WOv4qYkmBqPJ66eApb8vLGQS0/uIcDEbbbqCAS6HNc2P3Aj7q1x1Nw0hrP0DU1u9543JgtU5OSwmSRHwePNKoypSs5jgRaxjg+RXV+zXbiliGxVApVBxctd5gxb0K5G3COuNQgW03AnzJH1XyrU0gA2O4gyfIiPur6dROp+wnCyUHwfoelUDgHNIINwQZB9Cva5T2BzPEuqRSOtsfzKZMNj9w6H8yurL29Pf60c4wbq7N6yERFoLAiIgCIiAIiIAiIgCFEQGmYzF1qgqUnu3kFsAe3otJfSdQqSRtsup51lmsF7BFQdOY/K552qxUUO80GdRZOwDh15gwvmtVRbCz3PPwzBbGSfJlynNqTC5pb3tOo2DTtIniZtBG/lKgMaCAS/abATYuLrEx1VLTzJzQ1pjSRxweQeSF4djiKumbH7rPPfN7X0UOTbwzYKmPY0QwG/Ww+5U/Ja57t7puX/AIC1s1LzEyvVLMyx2gAkEgwOTYQqIww8I5u5Nlz/ALV1TSFBpiR4nD4tPAn2+S1bDY0ukE2ZAB+dljznFfzXOEQbDpaw+ygYAk6zxI/K0NyksyecEnNt8lwx4N1KdjW0m6jvwOVBwtVoF7ReStZzzP2a4ALuAqoUyuntS4Ck3wibm+YuqHU4+QHAHks+ArgbqlwbKte+iGzyQJ+cK4bldUD4SYvYgn5ArTOEYLZk4k8mDEV3B8kRdXGXYsaSHOA1Xgnqq1+KdEP+u6q8VHBKi6lYsMi1zlG24phC84TE1Gkhp3381puAzWoypDXTTBu03t5Dg+i2DFdoaLBAfqJ6AwPXooz01kHtSz+/J15RcYnFaGkC7jaHGR6gKG8OczU0+NpJ3uZ+Kfv7LXKWK1ukH3O6tTWLCx/BkFc9DZx5Or7mHE4xzRpIvvKw0cTFjBH7Tt/b1C95ywNqSNntDh5TuFFwI1Og7K9RW3J1o2Hs3mZw1ZlenJDTD2z+g7gXuPPggLu9GqHtDmmWuAIPUESCvzw8hsEb8Quy/wAPK2rA0/Fq0lzRO4ANh7Arf9Ote5w8dmnTS5cTZURF65sCIiAIiIAiIgCIiAIiIAufduKbatMx+l4McGZbf5yugFcv7T451AAEDUXEEEWhtifmWlYPqH9Mov8A5TUsyy/S0GY6WWvU9Xej1VpmmfPqEhzWiOBNlEoPnxOseF5UcxXJhLilXhoG54HWVe08RRbhdWkd8PCX/tmZP491plDEkvEnZWtaoRRrAggPcNJIsbAuI6iRErO68fiRjwR8S9rmnSZNo9yEw9SB3Y23J6lUz8XpBA+HYnqsOHx7h+qPkrlQ9uBteC0z7EQzSDufoqbB4YE6nDbqveIzA1SJjS35k9V7wOM0PDt4IPyMq+EJVwx5Jxi0jb8hwcjU5pv8MttHUAi6nZ9mbaNNzoAFNpMWEu4Bjz+6xUcVVIDqVUPbEtaXQ699jb6qtx+DfWLNcBgqNfW1G7g24YBuSfwvPWJT93R1PwVuKyPMH0hWNOQ6+kHx3vJB/qsOW5HXqW7qswjeQI+fC23O8/JbrquLWA2Y38Dk+ZVI/NdV6Nj1O/tBV6vm17Y8fJFzXwYKHYuua2l8gOa7Q/kOEEAx5Ar47sq5z+6qsdTrX0uiWPjz/G62HKu0teo+ix0AUiXOdybWF9rwPUqf2vxFXW2pSaXaQ14Let5Een3XXdPy+TucrKNExHZ2vhneMSOo/Kl1hNK/xNII9DYrqGhldjXxOpokevK0ntzgWU4LN6Zh8G1+oA3FuVXG6VskpHOWsmrYmoXua3cxYf56LYcs7NsLNVSoTImKcW9yCtZwziah07mAPTlbvhaT6IY2CBHP6v7Kd8nBJIE/CdjMM9oJfVbaS4lu3oQti7JY2lhdVFrtdMukHSJBsDJDjqBAHAWs180LqRpkG4sfQg39gV6ybD1XN102Oe0GCWgmD7Kmq+2Ek49r8SyMnFpo66Cih5O5xoUy+Q7SJnfyn2UxfWQluimegnlBERSOhERAEREAREQBERAc07U9qKr6hZTe6mxjiIaYJi2oke9lqmfY11XxVHFxiL79FtXbrLqdN50fG6HQCbNvM+8LRcRVLxoDSZ2iV8td6nrNTeefk8y3duwypxBBdNwD8Ri8/wB9/dRauLE2sBYLZHZA113v0xvpEuH2AUxmRYY0yWfzCOXHxe/HyViurItoq8lwLS0V6vwz4Gfuj9R/0zxzHTeVmmLNUQGlbDR7sk02NGgNgiP0tG19oAWPLMqsJHCzN5lvf4fYNZNNGBJERupeD7BvqUTVe7QP0i1/crpWFyikGanhrBzMAAebioudYjCvimK7ZOwa6QPcAtHoV3+JsS9pJZXJxvC5a4ue0O+EkDqYUvK8iqvdodHiI+GS6Og9VmxrHYfEPomSS6WuAu4ONiI87eoXUuzPZdtKkH1vFUcJ0zYW2PU/RbbLp4yvJPLKbC5TQpAUiHB7QB8Qj2t95U9mWNIgVD6PAc36bfJVGaUjSqDe338llwmM1eR5Xl3QlnOSrK8njNsmYZFRpE21sJLT6TIHpZVGZdn6wawUWgmRAOrxCCPCQ0+VltFPNnttqIaOOq9HPjYgrkLLIYxyjmEQsqyd9MaqghzmtNQSJFtv83IUnFuJiBGnYCVJOYamGAGk8nlVFZ5IIFQNIN5mHA+k7efVRcpTfPAbXSJtbOTRYG0o1H9XQeTdp81qGe44tY5hMuqzJO97uJ+fzKt6zLAGJjccqjyfI35hiXkENo0rOqGwtwOpMLbp4LOX0v2icVkveyfZai8MxAc8tElzTpLbRFwPW3+G07Q4wVPE3ZsAfMCyPmjTbh6EljJ8TQfESSSfmVXYnFGmWueLBwJnbe0+6z2TlZP5IuWeDH2hxwoUtJP86oNuWNO5PrsB6n1jdkMRVbqeHvb5BxEm/Qr3icmpV3Gq4vDnXLplpPoeB0BCyNomiNJGqNiOef8AArU0q8Q7D+UTcv7W4unV1d44gn4XElp8oP4ut6yntmazms7nxGBZ1r+oXOH1XE8NHT+gXReweTaWCs8XPwg+f6v6Lbop3Snti8Lz5/UtolNvCZuKIi+gPQCIiAIiIAiIgKntJnIwtNryAdT2tubAGST8gqLtD/ECjQaBTHeVHNmxEM/3Hk+QUTtzOIOg+FrJguHPLvT+i5gKZc4sBkSYPAHXyC8i/Wz3tQ66/wCGKzUSUmol/hO07HVJrNF7moJ1TzqmZBWXG4ygAXUnNE8gg/8A4qV2SsI8L3TzIF/Tp9VR1afiIHiAdE9RO68+VCZneSzxte976hx09VjwtcjSyk3c2aJJJO/vt8lDzN8QNrCR5wFa9jcM4k1zADQQ2eXG0jyCmq0oHFAscRj34IeJrDUeWgtMkAb6SRydz6DzW0ZLnFBxJq1adK0hjnNBjrc7LQu11N5xdMkSx7A5vSfheL8yB/2CwZ7TLmBjxBaPDPQ3EEKLoTwmT6L/ALYZ0K9UBj5pNjTBs63xefkVW4LD63NaNyY/utdy+sT4XAgsAB+wW44Cj3bZJh3PkOnqoW1+n7SEo8kutk9I4ujUcT/IJ3NnkbE9CDey2HMO0LBT07OmxH5Wp47FOLh0IEfn/PNTcspu1OqwXCBI4Mb+0KhWSjHD8dHd76J2c1mPaA3SY3PJVA0EXCg50TT0uaTofMA7iIkTzuLr2czpljWt3AuT15V+NyyczksqeJDrEQR9VjZmbGmGifbdUz8Wb9T0U5lFmHa11Yaqrrhh+FjeC4cuPTYcqv0khgtA8vZqiINt4VdiyQ67uNuqUM7qOMA+34WDHVf5w62twuKvDwRaLL/walame7exrtJA1lwExYy1pV3k2X0aFGnhw5wY0eNzSBqdyT5HoNlXi4DW2HQc+6YmoGs+IBo3PHoDyj62k/sbJSxeGa0hoGlvJFvcuWr9ou2eFEsGFbWaW7uIAJnkQZbv6rVs7zfvIptswH3cep/oterO1O8gtFGkWd0iccm3Uu2leuWtqMptpj4WU26Q3gbkk2TOczIeBeCwGQeZcPwtey5pDlaOxUv7vQHGBB3N7/lWSripe1cEXyzdP4dZCcS4161qFM8/rcLx6Dc/Jb9nmf6PDSIH+rj28lonZ/N8QzDmgYDCfCP1NHI9CbrLiMYXU44Fo9jp97RPouS1kYR9Orz2yxTUY7YnUMsr66THTMjfz5+qlLVf4d1icM5hMljzboCB+ZW1L3dPPfVGX2Ntct0UwiIriYREQBaz22z+phmNFJsvfPiNw0CLxybrZlWZ9lIxDI2cNidr7gqnUKbrfp9kLN217ezjWLzSviHBtas9wJAIkxBN/CFePyVtMQCC3gTv5nqpuL7MPokw25/VHHQHoqyrXcPA4ExYLwEpJ+/s85Jrsp8xrd2x55Phb77n2H3C1qg6+8G8Hofx091bZzV1vts2wjruT8/sFSNIBg8hWRe45nJix1NwPi554PoVY5Vm+ljW8AR6ELDhcGaurT8Ii52noPNVWIaabiPmrUlL2+SxLPBuWf4nXhaBHxBxIMcXG/Qkf/Va7VzJ/wALxtx/RbFlVcVcLTa9ttLgPQGBHu0n1nqqR2G7uodYDg24kb9D6KmM1lxl4It84ZYZHh+7Hf1WkNJ/lg/qPU8wOOqnYjHd4eB6L5hG9+3VVc7TuABBjgydp9FKzPJKFQN7sii4bGXEH/dufcLO5KUueyDeTzTplzYG+4/p7/0UhmJa1kF2kbyfK5VOcvxmHYagqMqNbctBJMDc+JosPVRcXnr67Gsc1g0knU0EEk9SSoPTyb74I4Zg7R50yqWCm0hrARfkk3IHEwLeSgU8nfUu8tY3z+L5K1yDKmuLqrhI1EMHpuZ4F4tc+17kYCgZBpj/ALPn56lrdiqW2BZnHRHySlRoyAdTos478GB05Cre09Ql9N5PxNj3a4/hw+S+4/LjRhzXamTzuD0P9foFlfhv/Jp6QQHslwH7gB4wPOAD/wAfNVx4mpt5ycXZCyeofE7p9z/aT7Kdi8RTpkVKjgLWHPrAUGtXDA0AbTAHWFRhxq1C6oTA3/ACujVvbb4RNRybI7tNLZbThnBcbuj/AEj8lVVXHufD6hJ6ACGt9Bsor8SCYA2sBxClUGOdLGNa791hA9epU/TjDnGDrikV2MrS89LfYL3hmK2f2ae8gy1vWAfsrjK+xxqRNTSwfE6I9hJ3UnqK8KKZ3cukUmDYeN1fZNhtPFzzzfzW0UMuwtNhZTYHHkxqJ9XH8WUXB0aeohtSmSOA4SPIhYdRJ+CDi0SMNhpAUqtTbp8dgbAC03n8L7TxVFn6w49GeI/Sw9yq3H4um6oHOqBrW7MkF3UyGzcrJCqcn0cUWXv8PMXWGIe2o3Q2pNrRaS0tjgAEf8gV0hcpyHM9FcVaZMFzGlp3LdIaRHqJXVl9L9Olmvb8G3Tv24CIi3l4REQBERAfHNBEESFrucdmg866cT+07HqPRbGirsqjYsSRGUFLs5VnHZFtSe7Bo1BcsN2nzad4XPM9yupQf42kdCNvYr9E509rKTqhZqLAYt1txsL3XPM8wgxFCoY8JbqaOhBEj7heVdTGqXDMdlag+Dn3Z3HNYXUn2a8y137XbQY4Nr8QsuY5LUqP8DSRIGoAloB6kcKT2ew5o1Hl9IVNIBbqEhpBEmDztdXAzy0Na1g6ARHssNtmye6JTJpPKK7EDRAAsAAB0AED6LHXqd/DnjwsI086o3b6dVir1zUfAuT8h5lfatdjIbMx/l/VVLPfkq3Mxf8AqZY69wbEHkfjyVliKmkkO8t9wCAR9Co2U5a2rV7wj+XTuZ2Lt2jzA3Pt1Vf2hxYY5xJ3Jjqeq0VxTawW1otMTi9NB5BJJlo9YvPzWnYbHtZbQdfF7evX2WyZPS76gwjcudaepMErNXyEOIAZqdNrXXVZGEnGaOt4bTI3ZIVQHarUAZM9edHnEeW0rPicXLpBVrmeHFGiGNEACPUk3+sqqweALHa6keTNz5F3AHl81XN7m2RlyyJVxmoFhMB4Ivwd2n5gKRkmGfLz8JYxx9SQQI677qbmPdVvDVaCeHCA9vmHfjbyVXgqz8NUio8GmJLXnZw5b67WU4r24X7/ALHUjBiskqPY0hzQdwCTO3WIm61yu0gkPBDm7g7rccmzNpljidBJ0OO7RwD5R8lcYvJ6FYAVWB0bEEhw8tQvHlsroXODxIsjI5/klAvqBlv5mzuQBJJ87BbE6nSw4I1kuvsBMnm8/VXNbIKDWt7oGk5oIa6XO3EXDiZWv4lppONMiCNzM6pvqnmd0nNWMk8SA7QVSYaQB6Cfsp//AK6A1xcXVCwxDB03iSBANiR0VPU7ppDjOro2L+vT1v6LzhTBn/LqOyK5SOdHnNM/r4iWhrqVPo2ZP+88+gt6qrFEhW2YUYbqaYEgEfZfMGNXErRGWV7UWpNrg84SmdhJVxhqDjaFPyvL3OgcdFvWQ9nwYkLsaHJhVMqew+Wk12EiQ0g/L+8LrSg4DLKdK7WgHqpy36en0otfJfCG1ERaCYREQBERAEREB8IlanmWWCj3gBBZUILWctj4vbZbVXnS6JmDEb7cea47nGKqDw1C8PaTqBmT6krzvqFiikscvPPwUXv2lhjSZ0jQ2eIEkefMe6os0y5lJneVGkt/UWvhok2B8JPRQMRm7w91QMZLotB/SI/SQsw7Yt0llWgHMcIcA6ZH+0j8rzYVxkzKq0yNT1VWasKxujY6dWoEcOJEn36qKOzWIEvrVKVBvLqjvs3c/RY8vpYfvg7D1ajJmKbmmRbl4MEDdfcXSqMJLSKnUSdvMED6KW3ZLh/mc9NJkzDdp8PRpihR11i0kay3S17ibuvsPXgBa7mnd1ahfWeJOzWGY/HzU7F02tbrIsRIHPp6zZaZJJWrTwU8tcF1aTNmyLNRhqkiXU3WcCIt1tN1vuBzzUPAGtB5FyfcrleU0mvLg8usJDRz1vxCtMBmIp+EOLBNg67fnu37KN9Ccs45OyrTZtuMoOfUa+pVe8MMhkNDQep0gT7rGMT3jtLT1kxMAb/AOeYVLiM1N2Psf8ANjypmDbUNEdwwv1mHFo1GQbNMbCIPnPkIzyjiOSuS2rJIxGXXlr9R/aRpPteCsGIwrnYeqXA6QOQbOkBvoZ+69Y3srmgBc3TYTAeNfoBET7qNkeX5hiAaL+/0T8NQOawEcuLh9EjFqO5yXH5kEnjLIOX0iSAFuuKwxpNpN1y4gyBuG2gnpufkozmYbBNOl7X1NjUfHds6hgPxOnkrwM3wzpc6uxzj8TtQkqLjKUt3g7GD7JeEBe4CZCo+0lRr8Q9sRphoIFxDRPreVZ4LPsID/8AIf8Ao6/0UTNs5wwL61Nri8gAagA3VENIEmYAmI4TbJPODrT8GrVMK+m4h7TPUgwZuN/JZWE8K/yjM31mmm8l4f8AEDz/AJ1Vbh8EdURBmL8eqsdnh9nWz1TpzTeCNQMW6mQrbs/kBJ1AETwbqdlmXDazr7j+4XQuz+WC1lo0tbayy+pcGPIsggAkLbMLhQ0LLRpgBZF6kYJF6QREUzoREQBERAEREAREQHyVxztbjXVqz3OAaZ0wOA2w9SuxOC0LtfkZLi8A33IH3WHX1TnBbfBVam0cwr091VYmmtqxmWuEwqupgr+Kw5K8yHHZQotFVk9bTWA/cC353H1AHurPE19Jm4PUbry5uHDe7dpJO7+QeIdFgPkveFwj/ge7W1wOkmCRAn4huPJcsw3uIT55KXH4gvmSSqirRG62KpTpaxTJ8ROw45v0WerlFBwiHD/UHGfrb6LTVPaTg8GtZZXaxxDrTz7EflSq9OhYuqFs/wCgkfQ3WWt2ei4qtj/UCD9FGr4AQWNeHkGRYj1AnlXvbKWUy3t5JLcJSqBrWYhjiLAOBaY3AAKU6dXDvBY+pRqR4XA2cPItJBHkfkqYUS1wWx06ne0HMdcgS08y24/p7qE/Y1zlMPgnZf8AxCxlMaawbUjkgBx9dNvdVecdr8ZiHGar2s4YwkNA84391Aqu1Nba/wCFMoYOwgX9F1bE87eRhZ6KZzXOMuJJ6kkn6rJTw6vBgJ4Un/xjNxI6f06Lrsk+Eg2+iloUDwp1TC62tmQQfYzE/YKyZhHHa3opNLLHEyZKg4SfJDYz1hnnDsaGQKj/ANUXa0WkdDP2Kl4HCFxm87/kqZg8ic6prIkWj0A2W65FkEkahZZ4aeVjIRrcmQOz2VEwYXQMvwukBe8LgmsEAKUF7Nde1GtLAREVpIIiIAiIgCIiAIiIAiIgC8vYDuvSICox+WMP6R8lp+d5QC1zYiRwuiubKr8XgA5QlBMhKOThVbs8WPlxkDZe2hzZEWPz6WK6tjMgB4VeezY6LK9JEr9M5BRyMsqB7dRAmAR1EXM+amOwNc+XsurM7NDovZ7NjopegSUTj7sjeTJJlZqeQuXVj2eHRZKXZ4dF302S5OP4vs7UJkNUnL8hqt3auyU+zw6KQzIW9FD+Gyc2nJqPZvq1WmHyA/tXTKeSt6KVTyto4VioO7Tm1Ps8f2rKOznkulNwLei9jBt6KXojYc6w/Zy+yu8N2aEbLbG4Zo4WYNUlWju0p8DkjW7hWtKkG7BZEViikSCIi6AiIgCIiAIiIAiIgCIiAIiIAiIgC+FfUQGNzV40BEXAeg0IWhEXQeCwdF6a0L6i4uwewF9CIug+oiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA//Z",
        vendor: {
            rating: 0,
            _id: "679a1948fb1122491c289d71",
            name: "PurelyFresh",
            email: "purely-fresh@gmail.com",
            location: "Mumbai"
        }
    }
];

const ProductList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const handleVendorClick = (e, vendorId) => {
        e.stopPropagation(); // Prevent modal from closing
        navigate(`/vendor/${vendorId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {dummyProducts.map((product) => (
                        <div 
                            key={product._id} 
                            onClick={() => setSelectedProduct(product)}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,128,0,0.1)] 
                                border border-green-100 hover:shadow-[0_0_25px_rgba(0,128,0,0.2)] transition-all duration-300 cursor-pointer group"
                        >
                            <div className="relative">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.organic && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                        Organic
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                                </div>
                                <p className="text-sm text-gray-600">by {product.vendor.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div 
                        className="bg-white/90 backdrop-blur-sm rounded-3xl max-w-2xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,128,0,0.1)] border border-green-100"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img 
                                src={selectedProduct.image} 
                                alt={selectedProduct.name}
                                className="w-full h-64 object-cover"
                            />
                            <button 
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center 
                                    text-gray-600 hover:text-gray-900 transition-colors duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {selectedProduct.organic && (
                                <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                                    Organic
                                </div>
                            )}
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h3>
                                    <p className="text-3xl font-bold text-green-600">₹{selectedProduct.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 mb-1">Harvest Date</p>
                                    <p className="font-medium text-gray-800">
                                        {new Date(selectedProduct.harvest_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-green-100 pt-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Vendor Details</h4>
                                <div 
                                    className="space-y-2 p-4 rounded-xl bg-green-50/50 hover:bg-green-50 transition-colors duration-300 cursor-pointer"
                                    onClick={(e) => handleVendorClick(e, selectedProduct.vendor._id)}
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p className="text-gray-800">{selectedProduct.vendor.name}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-gray-800">{selectedProduct.vendor.location}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-gray-800">{selectedProduct.vendor.email}</p>
                                    </div>
                                    <div className="flex items-center text-green-600 mt-2">
                                        <span className="text-sm">Click to view vendor profile</span>
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-green-600 text-white rounded-xl font-medium 
                                hover:bg-green-700 transition-colors duration-300 hover:shadow-lg hover:shadow-green-600/20">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;