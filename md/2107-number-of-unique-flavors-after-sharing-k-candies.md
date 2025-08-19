### Leetcode 2107 (Medium): Number of Unique Flavors After Sharing K Candies [Practice](https://leetcode.com/problems/number-of-unique-flavors-after-sharing-k-candies)

### Description  
You have a row of candies, each described by its flavor (flavor is just an integer). You must pick a segment of exactly k consecutive candies to give to your sister. After she takes those, you'll keep the rest. Your goal is to maximize the number of *unique* flavors among the candies you keep. Find the highest possible number of unique flavors you could retain.

### Examples  

**Example 1:**  
Input: `candies = [1,2,3,2,1,4,5], k = 3`  
Output: `4`  
*Explanation: If you give candies with indices 2,3,4 (values 3,2,1), you keep [1,2,4,5] whose unique flavors are {1,2,4,5} with 4 types. Any other segment gives 4 or fewer.*

**Example 2:**  
Input: `candies = [1,1,1,1], k = 2`  
Output: `1`  
*Explanation: No matter which 2 consecutive candies you give, you always keep two candies with both being flavor 1. Only 1 unique flavor remains.*

**Example 3:**  
Input: `candies = [6,3,3,6,7,3], k = 2`  
Output: `2`  
*Explanation: If you give away candies at indices 1,2 (values 3,3), you're left with [6,6,7,3]. That's 6,6,7,3 → unique {3,6,7} (3 types). But if you give away at indices 2,3 (3,6), you keep [6,3,7,3] → unique {3,6,7} (3 types). However, if you give away at indices 4,5 (7,3), you keep [6,3,3,6] → unique {3,6} (2 types). So answer is 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try every window of k consecutive candies, remove their flavors, count the unique flavors left, and record the maximum.  
    - For each possible window: copy and remove, scan remaining for unique flavors.  
    - However, this is O(n²) time since every possible segment requires a scan of the rest.
- **Optimized:**  
    - Notice that after removing k consecutive candies (indices i to i+k-1), the remaining candies are simply those outside the window.
    - We can use a **sliding window**.  
    - Maintain a frequency map of all flavors.  
        1. Initially, add all flavors to the map (full array counts).
        2. For first window, decrement frequencies of candies in indices 0…k-1 (the segment given away). As any flavor’s count drops to zero, reduce unique count.
        3. Count current number of unique flavors (number of nonzero flavors) and record.
        4. Slide the window: for each new window (from index i=1 up to n−k):
            - the candy leaving the “given” window (at i−1) gets its frequency restored (increment in map),
            - the new one entering “given” window (at i+k−1) gets decremented (decrement in map),
            - re-calculate unique count if any flavor count hits zero or becomes nonzero.
            - keep track of the maximum.
    - This gives O(n) time and O(n) space.
- **Trade-offs:** O(n) is optimal since we need to process each candy at least once.

### Corner cases to consider  
- k == n (give all candies): you keep none, so answer is 0.
- k == 0 (give none): you keep all, so answer is count of unique flavors in whole array.
- All candies are same flavor.
- Candies array is empty.
- k > n (not allowed by constraints, but code should guard or assume as per constraints).
- k == 1 (take each candy out one by one).

### Solution

```python
def shareCandies(candies, k):
    # Step 1: Count all flavors in the full candies list
    freq = {}
    for flavor in candies:
        freq[flavor] = freq.get(flavor, 0) + 1

    n = len(candies)
    if k == 0:
        return len(freq)
    if k >= n:
        return 0

    # Step 2: Initialize by removing the first window [0, k-1]
    for i in range(k):
        flavor = candies[i]
        freq[flavor] -= 1
        if freq[flavor] == 0:
            del freq[flavor]

    # Current unique flavors after giving away first window
    max_unique = len(freq)

    # Step 3: Slide the window
    for i in range(1, n - k + 1):
        # The flavor returned to us (leftmost of the previous segment)
        back_in = candies[i - 1]
        freq[back_in] = freq.get(back_in, 0) + 1

        # The flavor now being given away (new rightmost)
        out = candies[i + k - 1]
        freq[out] -= 1
        if freq[out] == 0:
            del freq[out]

        # Update max_unique
        max_unique = max(max_unique, len(freq))

    return max_unique
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of candies.  
    - One pass to build the frequency map, one pass to slide the window. All dict operations are expected O(1).
- **Space Complexity:** O(n) in the worst case, as we may need to store frequency for all different flavors.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must give away _k_ (not necessarily consecutive) candies?  
  *Hint: Can you use combinations or frequency sets to maximize the kept flavors?*

- Can you output the window that achieves the maximum unique flavors, not just the count?  
  *Hint: Store the starting index of windows while tracking maximum.*

- If each candy also has a cost, and you want to maximize unique flavors while minimizing cost of kept candies?  
  *Hint: Think about using advanced structures, maybe prioritize cost per flavor.*

### Summary
This problem is a classic use of the **fixed-length sliding window** technique, combined with frequency counting (hashmaps). By keeping track of the count of each flavor and updating it as the “window” of given-away candies moves, we efficiently determine the maximal unique flavors retained. This pattern is common in questions dealing with subarrays, substrings, or segments, and is useful in many string and array sliding window problems.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window)

### Similar Problems
- Remove Boxes(remove-boxes) (Hard)
- Subarrays with K Different Integers(subarrays-with-k-different-integers) (Hard)