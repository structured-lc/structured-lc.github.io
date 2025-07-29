### Leetcode 2813 (Hard): Maximum Elegance of a K-Length Subsequence [Practice](https://leetcode.com/problems/maximum-elegance-of-a-k-length-subsequence)

### Description  
Given a list of items, where each item has two integers: profit and category, select **k** items as a subsequence to maximize the **elegance**.  
Elegance = total profit of the chosen k items + (number of unique categories among chosen items)².

Your task: pick any k items (order matters, i.e., subsequence), so that  
Elegance = sum of selected profits + (number of unique categories)²  
is maximized.

### Examples  

**Example 1:**  
Input: `items = [[3,1],[5,2],[4,1]]`, `k = 2`  
Output: `10`  
*Explanation: Choose [5,2] and [4,1]: total profit = 5 + 4 = 9, categories = {1,2}, so 2 unique ⇒ 9 + 2² = 13,*  
*But if pick [5,2] and [3,1]: 5 + 3 = 8, categories = {1,2} ⇒ 8 + 2² = 12.*  
*Best is [5,2] + [4,1]: 9 + 2² = 13.*  
*(Note: This sample is hypothetical. Actual example values may differ; the idea is shown.)*

**Example 2:**  
Input: `items = [[10,2],[1,2],[2,3]]`, `k = 2`  
Output: `14`  
*Explanation: Pick [10,2] and [2,3]: total profit = 10+2=12, categories = {2,3}, so 2 unique ⇒ 12+4=16.*  
*If pick [10,2] and [1,2]: only 1 category ⇒ profit=11, only 1 unique category: 11+1=12.*  
*Best is [10,2] + [2,3]: 12 + 2² = 16.*  

**Example 3:**  
Input: `items = [[1,1]]`, `k = 1`  
Output: `2`  
*Explanation: Pick the only item; profit=1, only 1 unique category: 1+1 = 2.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Generate all k-length subsequences, compute profit & unique categories — O(C(n, k) × k) — infeasible for large n.
- **Observation**: The score increases both with profit and with more unique categories due to the quadratic term (category count)².
- **Optimized idea**:  
  - The top profits tend to maximize total.
  - More unique categories can substantially increase the score.
  - Select the k highest-profit items, track duplicate categories among them.
  - Try replacing duplicate-category items in your top-k group with slightly less-profitable items from new categories to increase the unique category count.  
  - Each swap reduces profit, but increases the (unique categories)² "bonus".
  - Greedily choose swaps that maximize the net gain.
- **Implementation**:
  - Sort items by descending profit.
  - Pick the first k items, note total profit and their categories.
  - Save duplicate-category items among those k (lowest profits).
  - For remaining items (not chosen), if they introduce a new category, consider swapping them in for smallest-profit duplicate-category item among those in initial k-set.
  - After every such operation, check if elegance improves.
  - The process continues as long as new categories can be added through swap.
- **Trade-offs**: Iterate as only as long as possible to keep solution O(n log n).

### Corner cases to consider  
- Single item, single category.
- k equals n (all items are chosen).
- All items from the same category.
- All items have the same profit.
- Categories > k (more categories than you can pick), or fewer categories than k.
- Items with profit 0.

### Solution

```python
def findMaximumElegance(items, k):
    # Sort items by descending profit
    items.sort(reverse=True)
    
    total_profit = 0
    category_set = set()
    dup_profits = []
    
    # Pick first k items; track duplicates
    for i in range(k):
        profit, category = items[i]
        total_profit += profit
        if category in category_set:
            dup_profits.append(profit)  # Could be replaced later
        else:
            category_set.add(category)
    
    # Start with initial answer
    max_elegance = total_profit + len(category_set) * len(category_set)
    
    # dup_profits as a stack (largest at the end, so reverse)
    dup_profits = dup_profits[::-1]
    idx = k  # Items after the first k
    
    while idx < len(items) and dup_profits:
        profit, category = items[idx]
        if category not in category_set:
            # Swap: remove smallest dup profit, add this
            removed_dup = dup_profits.pop()
            total_profit += profit - removed_dup
            category_set.add(category)
            curr_elegance = total_profit + len(category_set) * len(category_set)
            max_elegance = max(max_elegance, curr_elegance)
        idx += 1
    
    return max_elegance
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to sorting. The post-scan for swaps is O(n).
- **Space Complexity:** O(n), for storing sets or lists of categories, duplicate storage, etc.

### Potential follow-up questions (as if you’re the interviewer)  

- What if k is very large (close to n)?
  *Hint: You'd almost always take most of the data, so how does that impact category uniqueness?*

- Can you do it without sorting?
  *Hint: How would you select k largest efficiently? What if you can’t sort all?*

- What if there are additional weights/constraints on categories?
  *Hint: Could add filtering in the swap step, possibly with maps.*

### Summary
The approach is a blend of **greedy** and **priority queue/min-stack**: pick the k largest by profit, but selectively swap out duplicates for new categories. This problem is an example of greedy “maximize one term but look for global boost” strategy commonly used in optimization with combinatorial constraints. Recognizing when to “trade” a little main value (profit) for a much bigger quadratic bonus (category set) is a key idea here. This pattern is common in "maximize sum plus f(unique thing)" combinatorics, e.g. in problems combining totals and diversity.