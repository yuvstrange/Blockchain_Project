pragma solidity ^0.8.3;

library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a / b;

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}

contract FitChain {
    using SafeMath for uint256;
    struct user {
        string name;
        address addr;
        uint256 amount;
        uint256 weight;
        uint256 height;
        uint256 age;
        uint256 startAt;
        uint256 endAt;
        bool isEnd;
        bool isUnsubscribed;
    }
    event newUserEnrolled(uint256 id);

    event Transfer(address indexed from, address indexed to, uint256 value);

    address payable public owner;
    mapping(address => uint256) public balance;
    uint256 public numUsers;
    uint256 public fee;
    uint256 public deadline;
    uint256 public monthToSecond;
    uint256 public calorieCount;

    mapping(uint256 => user) public users;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(uint256 feePerMonth, uint256 userDeadline) {
        owner = payable(msg.sender);
        numUsers = 0;
        fee = feePerMonth;
        deadline = userDeadline;
        monthToSecond = 2629743;
    }

    function checkDeadline() public payable onlyOwner {
        uint256 id = 0;

        while (id <= numUsers) {
            if (!users[id].isUnsubscribed) {
                users[id].isEnd = (block.timestamp >=
                    users[id].endAt + deadline);

                if (users[id].isEnd) {
                    if (!owner.send(users[id].amount)) {
                        revert();
                    } else {
                        users[id].isUnsubscribed = true;
                    }
                }
            }

            id++;
        }
    }

    function check(uint256 id) public view returns (uint256) {
        uint256 a = uint256(6).mul(users[id].age);
        uint256 b = uint256(5).mul(users[id].height);
        uint256 c = uint256(13).mul(users[id].weight);
        uint256 d = uint256(67).add(c);
        uint256 e = uint256(d).add(b);
        uint256 f = uint256(e).sub(a);

        return f;
    }

    function transfer(
        address to,
        uint256 C_count
    ) public payable onlyOwner {
        require(C_count > 500);
        balance[msg.sender] = balance[msg.sender] - msg.value;
        balance[to] = balance[to] + msg.value;
        emit Transfer(msg.sender, to, msg.value);
    }

    function pay(
        uint256 month,
        uint256 height,
        uint256 weight,
        uint256 age,
        string memory name
    ) public payable {
        require(msg.value == fee);

        uint256 id = 0;

        while (id <= numUsers) {
            if (users[id].addr == msg.sender && !users[id].isUnsubscribed) {
                users[id].amount = (users[id].amount).add(msg.value);
                users[id].endAt = (users[id].endAt).add(
                    (month).mul(monthToSecond)
                );
                users[id].isEnd = false;
                users[id].height = height;
                users[id].weight = weight;
                users[id].height = age;
                users[id].name = name;
            }

            id++;
        }

        user memory u = users[numUsers++];
        u.addr = msg.sender;
        u.amount = msg.value;
        u.startAt = block.timestamp;
        u.endAt = u.startAt + (month * monthToSecond);
        u.isEnd = false;
        u.isUnsubscribed = false;

        emit newUserEnrolled(id);
    }
}
