### Leetcode 2561 (Hard): Rearranging Fruits [Practice](https://leetcode.com/problems/rearranging-fruits)

### Description  
Given two baskets `basket1` and `basket2`, each with *n* fruits represented by integers as their costs, you can swap a fruit at any position in `basket1` with any in `basket2`. Swapping fruit `i` from `basket1` with fruit `j` from `basket2` costs `min(basket1[i], basket2[j])`.  
The goal is to make both baskets equal (i.e., having the same multiset of fruit costs) using swaps of this type, minimizing the total swap cost. If it is impossible, return `-1`.

### Examples  

**Example 1:**  
Input: `basket1 = [4,2,2,2]`, `basket2 = [1,4,1,2]`  
Output: `2`  
*Explanation: Swap one `2` (from `basket1`) with one `1` (from `basket2`). After the swap, both baskets will become `[4,2,1,2]` and `[1,4,2,2]`, which can be sorted to `[1,2,2,4]` for both. The cost is `min(2,1) = 1`. A second swap is needed for the other excess 2 and 1, costing `1` again, so total cost is `2`.*

**Example 2:**  
Input: `basket1 = [1,1,1,1]`, `basket2 = [1,1,1,1]`  
Output: `0`  
*Explanation: Both baskets are already equal; no swap needed.*

**Example 3:**  
Input: `basket1 = [2,4,6]`, `basket2 = [1,3,5]`  
Output: `-1`  
*Explanation: It is impossible to make the baskets equal. No swap sequence results in equal baskets.*

### Thought Process (as if you’re the interviewee)  

I'd start by thinking about the brute-force: for every pair of differing elements, consider swapping until baskets are equal, minimizing cost. This would be **extremely slow**.

Instead, here's how to optimize:
- **Count the frequency of each fruit cost in both baskets.** For the baskets to be made equal, the sum of each unique fruit cost across both baskets must be even (because each basket should end up with half the total quantity of each fruit).
- **Determine the minimum swaps needed:** For every fruit where the count differs, only half the differences need to be swapped (since each swap fixes both baskets).
- **Pair up** the excess from one basket with the deficit in the other.
- For each swap, the cost is `min(a, b)`. But it's important to consider that sometimes, due to swap costs, it might be optimal to perform a *double-swap* using the globally minimum valued fruit if it is cheaper (swap with min element, then back to the other, for a cost of `2 * minValue`). So, for each swap, use the cheaper of the direct cost and double-swap via the minimum fruit overall.

Trade-offs:  
- This approach only works if the parity constraint is satisfied (every fruit appears an even number of times overall).
- Sorting needed for the costs, but this is efficient.

### Corner cases to consider  
- Both baskets already equal — expect 0 cost.
- Impossible cases — when for any fruit, the sum of its counts in both baskets is odd.
- Only one type of fruit, but distributed unevenly.
- Large numbers of the same fruit (big difference).
- Some fruits appear only in one basket.

### Solution

```python
def minCost(basket1, basket2):
    # Step 1: Count frequency of each fruit in both baskets
    from collections import Counter

    count = Counter(basket1)
    count.subtract(Counter(basket2))

    # Step 2: Check parity condition - every fruit must be fixable by swapping
    to_swap = []

    for fruit, freq in count.items():
        if freq % 2 != 0:
            return -1   # Impossible if we have odd difference

        # Only need to fix half of the difference (as each swap fixes 2)
        to_swap.extend([fruit] * (abs(freq) // 2))

    if not to_swap:
        return 0

    to_swap.sort()
    min_fruit = min(min(basket1), min(basket2))

    # Swap the smallest half with the largest half
    n = len(to_swap) // 2
    cost = 0
    for i in range(n):
        # Either do the direct swap (cost = to_swap[i])
        # Or, swap via min value twice (cost = 2 * min_fruit)
        cost += min(to_swap[i], 2 * min_fruit)
    return cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — from sorting `to_swap`, where n is the number of swaps needed; counting is O(n).
- **Space Complexity:** O(n) — counts and the list to store items to be swapped.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize further for very large arrays with a small number of unique fruits?  
  *Hint: Use hash maps for counting rather than sorting the whole array.*

- What if the swap operation could only occur at the same index (i.e., only basket1[i] with basket2[i])?  
  *Hint: Then this becomes a simple comparison of each index; much easier, O(n) time.*

- If the cost function was not min(a, b) but abs(a-b), how would your approach or logic change?  
  *Hint: The parity argument may not suffice; would have to use a greedy strategy or dynamic programming.*

### Summary
This problem is a classic case of frequency balancing combined with greedy optimization for swap cost, using counting and sorting. The solution applies counting (hashing/map), parity check for impossible cases, then sorts and greedily assigns swaps, considering both direct and double-swap (through global min) options for minimum total cost. This **frequency balancing** and **greedy min-cost swap** pattern is common in problems requiring equalization of multisets, such as pairing socks, rearranging cards, or anagrams reconciliation.


### Flashcard
For each fruit, ensure total count is even; swap the smallest mismatched pairs to minimize cost.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sort(#sort)

### Similar Problems
- The Latest Time to Catch a Bus(the-latest-time-to-catch-a-bus) (Medium)
- Minimum Number of Operations to Make Arrays Similar(minimum-number-of-operations-to-make-arrays-similar) (Hard)