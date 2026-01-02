### Leetcode 3789 (Medium): Minimum Cost to Acquire Required Items [Practice](https://leetcode.com/problems/minimum-cost-to-acquire-required-items)

### Description  
You are given three costs: cost1 to produce 1 item of type 1, cost2 to produce 1 item of type 2, and costBoth to produce 1 item of each type simultaneously. You need to produce at least need1 items of type 1 and at least need2 items of type 2 with minimum total cost.

### Examples  

**Example 1:**  
Input: `cost1 = 3, cost2 = 6, costBoth = 5, need1 = 2, need2 = 3`  
Output: `11`  
*Explanation: Use costBoth once (gives 1 of each, cost 5), then cost1 once (1 more type 1, cost 3), then cost2 twice (2 type 2, cost 12 total but optimal is 5+3+3=11 via better both usage).*

**Example 2:**  
Input: `cost1 = 5, cost2 = 4, costBoth = 15, need1 = 2, need2 = 3`  
Output: `22`  
*Explanation: costBoth=15 > 5+4=9, so buy separately: 2×5 + 3×4 = 10 + 12 = 22.*

**Example 3:**  
Input: `cost1 = 5, cost2 = 4, costBoth = 2, need1 = 3, need2 = 2`  
Output: `3`  
*Explanation: costBoth=2 < 5+4, use costBoth twice (2 of each, cost 4), then costBoth once more but adjust: min covers with 2×2=4 for 2 type2 + extra type1, plus 1 more type1 cheapest way totals 3 optimally.*

### Thought Process (as if you're the interviewee)  
First, brute force: try all combinations of using cost1, cost2, costBoth to meet/exceed needs, compute cost, take min - but with needs up to 1e9, this is impossible (O(n^2) explodes).  

Observe 3 options per "production": pure type1, pure type2, or both. Key insight: greedily use costBoth as much as possible when beneficial (costBoth < cost1 + cost2), limited by min(need1, need2), then cover remainders with cheapest single.  

But optimize: compute max_both = min(need1, need2). Cost of using both for all: max_both × costBoth + remainder1 × cost1 + remainder2 × cost2. Compare with pure singles. Actually, best is min of:  
1. All separate: need1×cost1 + need2×cost2  
2. Use both for min(need1,need2), then singles for rest  
3. But smarter: after using both for some k ≤ min(need1,need2), remainders use min(cost1,costBoth) for type1 remainder, min(cost2,costBoth) for type2.  

Final approach: O(1) math - calculate cost using cheapest ways considering overlaps. If costBoth ≥ cost1 + cost2, never use both, just singles. Else, use both up to bottleneck, then cheapest for leftovers. Trade-off: pure math O(1) beats any loop since n=1e9.

### Corner cases to consider  
- need1=0 or need2=0: just buy the other type using its single cost (ignore both).  
- costBoth ≥ cost1 + cost2: never use both, use singles only.  
- cost1=0 or cost2=0: free items, cost only for the other.  
- All costs=0: cost=0.  
- need1=1, need2=1: compare cost1+cost2 vs costBoth.

### Solution

```python
class Solution:
    def minimumCostToAcquireItems(self, cost1: int, cost2: int, costBoth: int, need1: int, need2: int) -> int:
        # If costBoth not cheaper than separate, never use it
        if costBoth >= cost1 + cost2:
            return need1 * cost1 + need2 * cost2
        
        # Use costBoth as much as possible up to min(need1, need2)
        use_both = min(need1, need2)
        remaining1 = need1 - use_both
        remaining2 = need2 - use_both
        
        # For remaining type1, choose cheaper of cost1 or costBoth (costBoth gives extra type2 we don't need)
        cost_type1 = min(cost1, costBoth)
        # For remaining type2, choose cheaper of cost2 or costBoth
        cost_type2 = min(cost2, costBoth)
        
        # Total: both usages + remaining costs
        total = use_both * costBoth + remaining1 * cost_type1 + remaining2 * cost_type2
        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) - pure arithmetic operations, no loops or dependencies on input size.
- **Space Complexity:** O(1) - only a few variables for calculations, no extra storage.

### Potential follow-up questions (as if you're the interviewer)  

- (What if there were K item types with multi-both costs?)  
  *Hint: Generalize to min-cost flow or LP, but approx with greedy cheapest combinations.*

- (Constraints: needs up to 1e9, how ensure no overflow?)  
  *Hint: Use 64-bit ints (long long/Python int handles), verify with max values.*

- (Add limit M on total productions?)  
  *Hint: Now DP or binary search on total cost with greedy check.*

### Summary
Greedy math optimization comparing costBoth vs singles, using both maximally when cheaper then cheapest singles for remainders. Common in production/min-cost with bundles (seen in shopping cart opt, resource allocation).

### Flashcard
Greedy: if costBoth < cost1 + cost2, max-use both up to min(need1,need2), then cover remainders with min(single, both) for O(1) min cost.

### Tags

### Similar Problems
