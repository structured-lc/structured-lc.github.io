### Leetcode 2070 (Medium): Most Beautiful Item for Each Query [Practice](https://leetcode.com/problems/most-beautiful-item-for-each-query)

### Description  
You are given a list of items, each with a **price** and a **beauty** value. For a given list of queries (where each query is an integer **q**), you must find, for each query, the *maximum beauty* among all items whose price is **≤ q**. If there is no such item, return 0 for that query.  
This is like, given a catalog, for each client's budget, tell them the most beautiful item they can afford.

### Examples  

**Example 1:**  
Input: `items = [[1,2],[3,4],[5,6]]`, `queries = [1,2,3,4,5]`  
Output: `[2,2,4,4,6]`  
*Explanation:*
- q=1: Only price ≤ 1 is [1,2] → beauty=2  
- q=2: Only price ≤ 2 is [1,2] → beauty=2  
- q=3: [1,2],[3,4] → max beauty=4  
- q=4: [1,2],[3,4] → max beauty=4  
- q=5: All items → max beauty=6  

**Example 2:**  
Input: `items = [[2,100],[1,1],[3,50]]`, `queries = [2,3,1]`  
Output: `[100,100,1]`  
*Explanation:*
- q=2: [2,100],[1,1] → max beauty=100  
- q=3: [2,100],[1,1],[3,50] → max beauty=100  
- q=1: [1,1] → beauty=1  

**Example 3:**  
Input: `items = [[3,8],[2,6],[8,20]]`, `queries = [4]`  
Output: ``  
*Explanation:*
- q=4: [3,8],[2,6] → max beauty=8  

### Thought Process (as if you’re the interviewee)  
Start with brute-force:  
For each query, scan all items, select those with price ≤ q, and track the max beauty.  
This takes O(Q \* N) -- fine for small N and Q, but not for big input.  
We can do better.

Optimization idea:  
- **Step 1:** Sort items by price.
- **Step 2:** Precompute, for each price in ascending order, the running maximum beauty so that for any price (≤ q), you know the most beautiful affordable item.
- **Step 3:** For each query, use binary search to find the rightmost item with price ≤ q, then output the max beauty up to that price.

Why? After preprocessing:
- Preprocessing: O(N log N) (sort) + O(N) (build running max).
- Each query: O(log N) (binary search).

Total complexity much faster, scalable for large N, Q.

Trade-offs:  
- Precompute allows fast query lookup, at the cost of a bit more code and O(N) extra space for max-beauty array.

### Corner cases to consider  
- Queries where no item is affordable (all items' prices > q) ⇒ should return 0.
- Multiple items with the same price: only the highest beauty matters.
- Duplicate queries (should still work).
- Items with zero beauty.
- Empty items list or empty queries list.

### Solution

```python
from bisect import bisect_right
from typing import List

def maximumBeauty(items: List[List[int]], queries: List[int]) -> List[int]:
    # Sort items by price
    items.sort()
    
    # Compress to running max beauty for items up to each price
    max_beauty = []
    prices = []
    cur_max = 0
    for price, beauty in items:
        cur_max = max(cur_max, beauty)
        # For duplicate prices, we only want the highest beauty so prices are unique
        if not prices or prices[-1] != price:
            prices.append(price)
            max_beauty.append(cur_max)
        else:
            # Overwrite last if price is the same (only keep highest beauty)
            max_beauty[-1] = cur_max

    res = []
    for q in queries:
        # Find the rightmost index where price ≤ q
        idx = bisect_right(prices, q) - 1
        if idx >= 0:
            res.append(max_beauty[idx])
        else:
            res.append(0)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(N log N) for sorting items.  
  - O(N) for building the max_beauty and prices lists.  
  - O(Q log N) for Q queries, each with a binary search.
  - **Total:** O(N log N + Q log N)

- **Space Complexity:**  
  - O(N) for prices and max_beauty arrays (since, in the worst case, each price is unique).  
  - O(Q) for results.
  - The input lists aren't copied (beyond sorting).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle frequent updates to the list of items?  
  *Hint: Preprocessing may no longer work; consider segment trees or balanced BST.*

- What if there are millions of queries and very tight time limits?  
  *Hint: Preprocessing is essential; could batch/parallel process queries.*

- Instead of max beauty, what if we needed the k-most beautiful items under each budget?  
  *Hint: Try heap or dynamic structures.*

### Summary
The approach is "offline queries + prefix-max preprocessing":  
- Sort items by price  
- Build a prefix maximum of beauty for each price  
- Answer each query efficiently via binary search  
This pattern—preprocessing sorted data for fast lookups and then using binary search—applies broadly (e.g., "maximum up to value", range queries, offline query problems). It’s a key pattern for time-efficient query answering, especially when the input is static.