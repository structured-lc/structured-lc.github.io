### Leetcode 3413 (Medium): Maximum Coins From K Consecutive Bags [Practice](https://leetcode.com/problems/maximum-coins-from-k-consecutive-bags)

### Description  
Given an array **coins** where each element is [l, r, c], representing a bag that covers all indices from l to r inclusive, and has a value c. Find the **maximum sum of coins** you can collect by choosing any sequence of **k consecutive indices** (a window of size k). If a bag covers at least one index in your chosen window, you collect its c coins (only once per bag even if it covers multiple spots in the window). Return the maximum coins possible among all length-k consecutive index windows.

Essentially:  
- Each bag spans a closed range [l, r] and has a fixed coin value c.
- You choose any k consecutive indices on the number line.
- All bags that overlap this window give their c coins.
- Overlapping coins for the same bag are not counted more than once.

Find the maximum total coins possible.

### Examples  

**Example 1:**  
Input: `coins=[[1,4,5],[2,4,4],[5,6,1]], k=2`  
Output: `10`  
*Explanation:  
Choose window [4,5]:  
- Bag1: [1,4,5] covers 4 and 5 → collect 5 coins  
- Bag2: [2,4,4] covers 4     → collect 4 coins  
- Bag3: [5,6,1] covers 5     → collect 1 coin  
Total = 5 + 4 + 1 = 10*

**Example 2:**  
Input: `coins=[[0,2,2],[4,5,4]], k=2`  
Output: `4`  
*Explanation:  
Try all consecutive windows:  
- [0,1]: Only bag1 covers; total=2  
- [1,2]: Only bag1 covers; total=2  
- [2,3]: Only bag1 covers 2 (bag2 only from 4); total=2  
- [3,4]: Only bag2 covers 4; total=4  
- [4,5]: Only bag2 covers; total=4  
Max is 4*

**Example 3:**  
Input: `coins=[[0,10,5]], k=10`  
Output: `5`  
*Explanation:  
Any window of length 10 will fall entirely inside [0,10], so you always pick up the only bag. Output = 5*

### Thought Process (as if you’re the interviewee)  

- **Naive brute-force:**  
  For every possible k-length window, check every bag to see if it overlaps the window. Sum up all covered bags.  
  This is O(n × m), n = #bags, m = length of range. Far too slow for large input.  
  
- **Optimize:**  
  Each bag's interval can overlap at most (bag span length + window length) many windows.  
  The problem reduces to, for all positions, efficiently calculating how many bags cover each window.  
  Since only the *unique* coins for each bag are counted, we need to identify all windows where each bag starts to overlap and ends to overlap.
  
- **Efficient idea:**  
  - For each bag, compute the first and last window positions where the bag is included (based on overlap conditions).
  - Using prefix sums, add the coin value c to each window starting at those positions, and subtract after the last position.
  - After sweep, prefix sum tells how much each window gets.
  - Finally, get the max prefix value.

- **Alternative method (sweeping):**
  We can sort bags by their left or right, use a sliding window over intervals, and maintain a running sum of values.

- **Final approach:**  
  - Since windows are fixed size and intervals may overlap, treat as a *sliding window coverage* problem.
  - For each window position, track bags that overlap using a two-pointer or sweep-line approach.
  - To handle negative ranges and non-uniform density, may need to compress coordinates and operate over compressed indices.

### Corner cases to consider  
- No bags at all (`coins=[]`).
- k is larger than the full span of bags on the number line.
- Bags overlap exactly at window boundaries.
- Multiple bags cover the same regions with equal or different values.
- Bags with zero-length (l=r).
- All coins have c=0.
- Bags fully inside some window; bags much wider than any k-window.

### Solution

```python
# Interview-style. Only simple itertools, no defaultdict etc.

def maximumCoins(coins, k):
    # 1. Collect all unique endpoints
    points = set()
    for l, r, _ in coins:
        points.add(l)
        points.add(r)
        points.add(l-1)
        points.add(r+1)
    # To include range boundaries from windows as well
    # since windows may start before l or end after r
    # We'll need all potential window starts
    compressed = sorted(list(points))

    # 2. Map original positions to compressed indices
    pos2idx = {x:i for i,x in enumerate(compressed)}

    n = len(compressed)
    delta = [0] * (n+1)

    # For each bag, find windows that this bag is included in
    # The bag [l,r], value c: it appears in windows whose
    # window [w, w+k-1] has at least 1 with overlap [l,r].
    # So window start (w) range is: max(l - k + 1, min_point) to min(r, max_point - k + 1)
    min_point = compressed[0]
    max_point = compressed[-1]
    for l, r, c in coins:
        window_start_left = l - k + 1  # earliest window which covers l
        window_start_right = r - k + 1 # last window whose right includes r
        actual_left = max(window_start_left, min_point)
        actual_right = min(r, max_point - k + 1)
        # Ensure actual_left <= actual_right before updating
        if actual_left > actual_right:
            continue
        il = pos2idx.get(actual_left, None)
        ir = pos2idx.get(actual_right, None)
        # Deal with actual_left outside compressed points (rare):
        # Use binary search, but let's avoid edge complications for note
        # If not found, skip for now

        # We'll walk all possible window positions and sweep via delta[]
        if il is None:
            # Find smallest index >= actual_left
            il = 0
            while il < len(compressed) and compressed[il] < actual_left:
                il += 1
            if il == len(compressed): continue
        if ir is None:
            # Find largest index <= actual_right
            ir = len(compressed)-1
            while ir >= 0 and compressed[ir] > actual_right:
                ir -= 1
            if ir < 0: continue
            
        delta[il] += c
        delta[ir+1] -= c

    max_coins = 0
    curr = 0
    for i in range(n):
        curr += delta[i]
        max_coins = max(max_coins, curr)
    return max_coins
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of bags, due to sorting and coordinate compression. For each bag, constant time delta updates and linear prefix sum.
- **Space Complexity:** O(m), where m = number of distinct endpoints from bags, for coordinate compression and delta array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if range endpoints can be as large as 10⁹?
  *Hint: Use coordinate compression and only process active intervals.*

- Could you handle updates to coins (add/remove bags, change value) efficiently?
  *Hint: Consider interval trees, segment trees, or binary indexed trees.*

- If instead of counting each bag once per window, we count how many indices overlap per window, how would you change the solution?
  *Hint: Range addition on an array and sliding window sum over index counts.*

### Summary
This approach applies **coordinate compression** and **sweep-line/prefix sum** patterns, converting arbitrary intervals into a manageable array for efficient range update and querying. The problem is a hybrid of **interval coverage** and **maximum sliding window**—both frequent in competitive programming and coding interviews. The technique generalizes to scenarios where we need to aggregate or count items across many overlapping ranges, such as range sum queries, event counting, or "active intervals" queries.


### Flashcard
For each k-length window, use a sweep-line or two-pointer technique to count how many bags (intervals) overlap it; accumulate coin sums efficiently.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Sliding Window(#sliding-window), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
