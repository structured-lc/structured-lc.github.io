### Leetcode 3155 (Medium): Maximum Number of Upgradable Servers [Practice](https://leetcode.com/problems/maximum-number-of-upgradable-servers)

### Description  
You are given n data centers, each with several servers. For every data center, you get four arrays of the same length:

- **count**: Number of servers in the data center.
- **upgrade**: Cost to upgrade each server.
- **sell**: Money obtained by selling a server.
- **money**: Initial money available for upgrades in that data center.

The goal is to determine, for each data center, the **maximum number of servers you can upgrade**, possibly selling some servers to fund upgrades. You cannot transfer money between data centers.

### Examples  

**Example 1:**  
Input: `count = [4,3], upgrade = [3,5], sell = [4,2], money = [8,9]`  
Output: `[3,2]`  
*Explanation:  
For data center 0:  
- If you sell 1 server: 8 + 4 = 12, remaining servers = 3. Upgrade cost = 3 × 3 = 9, which is affordable.  
For data center 1:  
- Sell 1 server: 9 + 2 = 11, remaining servers = 2. Upgrade cost = 2 × 5 = 10, which is affordable.*

**Example 2:**  
Input: `count = [1], upgrade = [2], sell = [1], money = [1]`  
Output: ``  
*Explanation:  
- 1 server. Not enough money to upgrade (2 needed but only 1). Can sell the server, but then have 0 servers to upgrade.*

**Example 3:**  
Input: `count = [5], upgrade = [5], sell = [2], money = [3]`  
Output: `[3]`  
*Explanation:  
- Sell 2 servers: 3 + 2 × 2 = 7, remaining servers = 3. Upgrade 3 servers: 3 × 5 = 15, but only have 7. Not enough.  
- Sell 3 servers: 3 + 3 × 2 = 9, remaining servers = 2. Upgrade cost 2 × 5 = 10. Missing 1.  
- Sell 4 servers: 3 + 4 × 2 = 11, 1 server left, needs 5 to upgrade, is possible. But fewer upgrades.  
- The optimal is to sell 2 servers and upgrade 3 servers, fitting the available money.*

### Thought Process (as if you’re the interviewee)  
To solve the problem, for each data center we need to maximize the number of servers that can be upgraded, possibly by selling some to raise more money. For each data center:

- For k from count down to 0:  
    - Try to keep k servers, sell (count-k) servers.  
    - Total money = initial money + money from selling (count-k) servers.  
    - Can we upgrade k servers with this total money?
    - If yes, this is possible. Choose the **maximum** such k.

Brute-force is acceptable since each data center’s count ≤ 10⁵, but per test case, we only need to check up to count[i] possibilities, which is feasible as count.length ≤ 10⁵, but usually the problem constraints make this approach reasonable.

We can optimize:
- Because upgrade cost increases as k increases and selling reduces the upgrade demand, a binary search can be used for k (0..count[i]) to find the best possible k efficiently.

Choose this approach for clarity and efficiency within problem limits.

### Corner cases to consider  
- Data center has 0 servers.
- Not enough money to upgrade any server, even after selling all but one.
- Selling all but zero (keeping no servers to upgrade) is the only option.
- Upgrade cost or sell value is zero.
- Selling a server yields enough money to upgrade several.
- All arrays have only one element.

### Solution

```python
def maximumUpgradableServers(count, upgrade, sell, money):
    # For each data center
    n = len(count)
    answer = []
    for i in range(n):
        left = 0
        right = count[i]
        max_upgrade = 0
        # Binary search for max number of servers we can upgrade
        while left <= right:
            k = (left + right) // 2  # try upgrading k servers
            servers_to_sell = count[i] - k
            total_money = money[i] + servers_to_sell * sell[i]
            upgrade_cost = k * upgrade[i]
            if upgrade_cost <= total_money:
                max_upgrade = k  # can upgrade k servers, try for more
                left = k + 1
            else:
                right = k - 1
        answer.append(max_upgrade)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log m), where n is the number of data centers, and m is the maximum number of servers in any data center. For each data center, we do a binary search over [0, count[i]].
- **Space Complexity:** O(n) for the output array; other variables are constant per data center.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the servers must be upgraded or sold in a certain order?
  *Hint: How could you adjust the solution for sequential dependencies?*
- If you could move money between data centers, how would you maximize the total upgrades?
  *Hint: Model it as a global budget and optimize upgrades across all centers.*
- What if each server had its own, not uniform, upgrade cost or sell value?
  *Hint: Sort the servers and use a greedy approach or DP.*

### Summary
The approach uses binary search within each data center to maximize the upgraded servers given local constraints. This is a classic search/greedy optimization pattern, useful in allocation/resource maximization problems and can be extended to other divide-and-conquer or greedy settings where individual decisions must be balanced for overall maximization.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search)

### Similar Problems
