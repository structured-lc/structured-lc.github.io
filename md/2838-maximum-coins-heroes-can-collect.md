### Leetcode 2838 (Medium): Maximum Coins Heroes Can Collect [Practice](https://leetcode.com/problems/maximum-coins-heroes-can-collect)

### Description  
Given three lists: heroes (each with a strength), monsters (each with a required strength to defeat), and coins (coins earned by defeating that monster), determine for each hero the *maximum total coins* they can collect by defeating all monsters whose strength is ≤ the hero’s strength. Each hero acts independently.

### Examples  

**Example 1:**  
Input:  
heroes = `[5]`,  
monsters = `[2,3,1,2]`,  
coins = `[10,6,5,2]`  
Output:  
``  
Explanation:  
- The hero (strength 5) can defeat all monsters (1,2,2,3).
- Total coins = 10 + 6 + 5 + 2 = 23.

**Example 2:**  
Input:  
heroes = `[2,3]`,  
monsters = `[1,2,4]`,  
coins = `[3,5,7]`  
Output:  
`[8,8]`  
Explanation:  
- Hero 1 (strength 2) can defeat monsters 1 (strength 1) and 2 (strength 2), so collects 3+5=8.
- Hero 2 (strength 3) can defeat monsters 1 and 2 (strengths ≤ 3), so collects 3+5=8.
- Monster 3 (strength 4) is too strong.

**Example 3:**  
Input:  
heroes = `[1,2,3]`,  
monsters = `[4,5,6]`,  
coins = `[7,8,9]`  
Output:  
`[0,0,0]`  
Explanation:  
- All heroes are weaker than any monster.
- No coins can be earned.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For each hero, iterate every monster. If monster’s strength ≤ hero’s strength, add coins to this hero's sum. This is O(n × m) (n = #heroes, m = #monsters), which is too slow for large lists.

- **Optimize:**  
  - Sort monsters and coins together by monster strength.
  - Build a *prefix sum* of coins for monsters sorted by strength. prefix_sum[i] = coins from monsters ... monsters[i-1].
  - For each hero:
    - Use *binary search* to find the rightmost monster whose strength ≤ hero's strength.
    - The prefix sum up to that index tells how many coins this hero can collect.
  - Main tools: sorting, prefix sum, binary search.
  - This makes each hero’s query O(log m), and overall time O(m log m + n log m), much faster.

- This approach is preferable because:
  - Sorting + prefix sum is linearish, acceptable for big inputs.
  - Binary search for each query is optimal for “aggregate sums up to a value”.

### Corner cases to consider  
- heroes or monsters are empty
- all heroes weaker than the weakest monster (result: all zeroes)
- some or all heroes stronger than all monsters (collect all coins)
- ties in monster strengths (multiple monsters with same strength)
- coins can be zero or negative (should sum as stated)
- monsters/coins length mismatch (shouldn’t happen by problem statement)
- very large input sizes (test efficiency)

### Solution

```python
from typing import List
from bisect import bisect_right
from itertools import accumulate

def maximumCoins(heroes: List[int], monsters: List[int], coins: List[int]) -> List[int]:
    # Pair monsters with coins and sort by monster strength
    monster_info = sorted(zip(monsters, coins))
    sorted_monsters = [m for m, _ in monster_info]
    prefix_coins = [0] + list(accumulate(c for _, c in monster_info))  # prefix_sum; prefix_coins[i] = sum of coins for monsters[:i]
    
    res = []
    for hero_strength in heroes:
        # Find rightmost monster index hero can defeat (strength ≤ hero_strength)
        idx = bisect_right(sorted_monsters, hero_strength)
        res.append(prefix_coins[idx])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Sorting monsters and coins: O(m log m)  
  For each hero, binary search: O(n log m)  
  Prefix sum: O(m)  
  **Overall:** O(m log m + n log m), where m = number of monsters, n = number of heroes

- **Space Complexity:**  
  O(m) for sorted list, prefix sum, and temporary structures. No extra space growing with n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the value of a hero defeating a monster depended on the order monsters are defeated?  
  *Hint: Dynamic programming or combinatorial enumeration might be needed.*

- How would you handle updates to monsters’ strengths or coins, or the addition/removal of monsters or heroes?  
  *Hint: Consider data structures for dynamic range sums like segment trees or binary-indexed trees.*

- How would you answer for the sum of coins of monsters within a range of strengths for each hero?  
  *Hint: Use range queries on the prefix sums or advanced data structures.*

### Summary
This problem is classic for combining **sort**, **binary search**, and **prefix sum**, a very frequent pattern for “find the sum/count/value up to some threshold”. This approach avoids brute force and is highly efficient even with large input sizes. This pattern applies to many similar problems, like “number of people ≤ height”, “sum of sales ≤ some quota”, and “max products before a budget”, etc.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
