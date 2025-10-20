### Leetcode 798 (Hard): Smallest Rotation with Highest Score [Practice](https://leetcode.com/problems/smallest-rotation-with-highest-score)

### Description  
Given an array of integers `nums`, you can rotate it left by `k` positions (i.e., move the first `k` elements to the end, keeping order) for any `0 ≤ k < n`, where `n` is the length of `nums`.  
After the rotation, the **score** is the number of positions `i` where the number at that position is less than or equal to its index: `nums[i] ≤ i`.  
Your task: Find the rotation index `k` (smallest if multiple answers) that gives the highest score.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 1, 4, 0]`  
Output: `3`  
*Explanation:*
If you rotate by 3, the array becomes `[4, 0, 2, 3, 1]`.
- At index=0, 4>0 (no point)  
- At index=1, 0≤1 (**+1**)  
- At index=2, 2≤2 (**+1**)  
- At index=3, 3≤3 (**+1**)  
- At index=4, 1≤4 (**+1**)  
Total score = 4, best possible.  

**Example 2:**  
Input: `nums = [1, 3, 0, 2, 4]`  
Output: `0`  
*Explanation:*
- No rotation: `[1, 3, 0, 2, 4]`
- At each index:  
  1≤0 No, 3≤1 No, 0≤2 (**+1**), 2≤3 (**+1**), 4≤4 (**+1**)  
Score = 3.  
Check all rotations: best score is already at k=0.

**Example 3:**  
Input: `nums = [2,4,1,3,0]`  
Output: `2`  
*Explanation:*
Rotate by 2 gives `[1,3,0,2,4]`.  
Only indices 2,3,4 (i.e., 0,2,4) satisfy nums[i] ≤ i, score=3 (best).  

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all k (0 to n-1): for each, rotate the array, check how many nums[i] ≤ i.  
  Time: O(n²) — too slow for n up to 10⁵.

- **Optimization with "Intervals" and Prefix Sums:**  
  *Key idea:* For each element, there is a specific range of k values where after rotation it “lands” in a position where nums[i] ≤ new_index, and gives a point.  
  - For each `nums[i]`, find the valid range(s) of k where this element counts as good after rotation.
  - For all such intervals, use a difference array to efficiently update the score increases and decreases for each rotation index.
  - Finally, prefix sum over the diff array gives the score at each k, and we can pick the k with the max score (smallest k if tie).
  - This approach is O(n).

- Why this approach?  
  Range updates are reduced from O(n²) to O(n) with prefix sum trick.  
  Tradeoff: Needs clear computation of interval logic and proper modular indexing.

### Corner cases to consider  
- Empty array (n=0): return 0 (no rotation possible).
- All elements = 0: every rotation is optimal.
- Only one element: always 0.
- Arrays with increasing, decreasing, or same elements.
- Multiple rotations yielding the same high score (return smallest k).
- Inputs where every number is larger than n-1 (cannot ever be “good”).

### Solution

```python
def best_rotation(nums):
    # n = length of nums
    n = len(nums)
    diff = [0] * (n + 1)  # difference array for range updates

    # For each nums[i], compute where its contribution starts and ends
    for i, num in enumerate(nums):
        # It is "good" when: num <= new_index
        # After rotation by k: new_index = (i - k + n) % n
        # To solve for k: num <= (i - k + n) % n
        
        # Rewriting: (i - k + n) % n >= num
        # Let x = (i - k + n) % n
        # So, k valid when (i - num + 1 + n) % n to (i + 1) % n

        # When k in [i - num + 1, i + 1), nums[i] stops contributing a score (+1)
        # So, it starts losing at (i - num + 1)%n, and gets it back at (i + 1)%n

        # Calculate left and right for k; all mod n
        left = (i - num + 1 + n) % n
        right = (i + 1) % n

        # Increase score at left, decrease at right
        diff[left] += 1
        diff[right] -= 1
        # If left > right, that means the interval wraps around (i.e., the interval [left, n) ∪ [0, right))
        if left > right:
            diff[0] += 1

    # Now do prefix sum to get scores for each rotation k
    best = -1
    score = 0
    max_score = -1
    for k in range(n):
        score += diff[k]
        if score > max_score:
            max_score = score
            best = k

    return best
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each element is processed in O(1), and the prefix sum scan is O(n).
- **Space Complexity:** O(n)
  - The difference array is size n+1; extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the scoring rule changes to “strictly less than” instead of “less than or equal to”?
  *Hint: Think about how intervals must change.*

- How could this be adapted for a very large array, where you can’t store O(n) extra space?
  *Hint: Is there a way to chunk or stream the difference array?*

- How would you modify your solution if the array is **circular** and you’re required to support multiple updates between rotation queries?
  *Hint: Range updates with wraparound — can segment trees or another data structure help?*

### Summary
This problem is a classic use of "difference array" or "prefix sum range events" — a common pattern for O(1) range updates, seen in interval processing (“sweep-line” or “calendar events”).  
Whenever a brute-force solution would repeat a similar calculation for each position, always ask: can I mark where contributions *start* and *stop* and process them together?  
This helps avoid O(n²) checks, and is valuable for interview performance on hard rotation/window/range questions.


### Flashcard
For each nums[i], mark the interval of k where it scores a point after rotation; use prefix sums to find the k with the highest score.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
