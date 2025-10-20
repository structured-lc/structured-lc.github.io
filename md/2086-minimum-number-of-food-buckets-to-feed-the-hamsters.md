### Leetcode 2086 (Medium): Minimum Number of Food Buckets to Feed the Hamsters [Practice](https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters)

### Description  
Given a string of length n where each character is either `'H'` (there is a hamster at position i) or `'.'` (the spot is empty), you must place as few buckets as possible (on empty spots) so that every hamster has access to at least one bucket in an adjacent space (either left or right). Multiple hamsters can share a bucket if adjacent.  
Return the minimum number of buckets needed, or -1 if it's impossible to feed all hamsters.

### Examples  

**Example 1:**  
Input: `H..H`  
Output: `2`  
*Explanation: Put buckets at indices 1 and 2. Both hamsters are adjacent to a bucket. If only one bucket is placed, one hamster cannot be fed.*

**Example 2:**  
Input: `.H.H.`  
Output: `1`  
*Explanation: Place a bucket at index 2, which feeds both hamsters at indices 1 and 3. Both have a neighbor with a bucket.*

**Example 3:**  
Input: `.HHH.`  
Output: `-1`  
*Explanation: No way to place buckets to feed all hamsters. The middle 'H' is between two other 'H's, with no empty spots adjacent. Impossible to feed all.*

### Thought Process (as if you’re the interviewee)  
- First, for every 'H', it must have a neighbor (left or right) with a bucket. Buckets can only go in empty spots.
- If two hamsters are adjacent with no empty spot between them (`'HH'`), it's impossible for both to be fed. So, we must handle impossible cases early.
- **Brute-force idea:** Try every possible combination of placing buckets. But this is infeasible for large inputs (exponential).
- **Greedy approach:**  
  - Sweep left to right. For every hamster:
    - If the right neighbor is empty (`'.'`), put a bucket there (if there isn’t already). This way, when we get to the next hamster, it may already be fed by this bucket.
    - If the right is not empty, check left for a bucket. If neither side can give a bucket, it's impossible.
    - Mark used buckets so we don't double count.
  - By always preferring the right, we minimize overlap and only drop a bucket when truly necessary.
- **Why this works:**  
  - Greedily placing buckets to the right gives future hamsters the best chance of sharing a bucket and reduces bucket count.

### Corner cases to consider  
- `'H'` at both ends: `'H...'`, `'...H'`
- Two or more consecutive `'H'`s with no dot between: `'HH'`, `'HHH'`
- Only one hamster and/or only dots: `'H'`, `'.'`
- No hamsters at all: `'.....'`
- All positions are hamsters: `'HHHH'`
- Hamsters surrounded by other hamsters: `'.HHH.'`

### Solution

```python
def minimumBuckets(hamsters: str) -> int:
    n = len(hamsters)
    # Convert string to list so we can mark bucket placements
    s = list(hamsters)
    count = 0
    for i in range(n):
        if s[i] == 'H':
            # If left has a bucket already, hamster is fed
            if i > 0 and s[i - 1] == 'B':
                continue
            # If right is empty, put bucket there
            if i + 1 < n and s[i + 1] == '.':
                s[i + 1] = 'B'
                count += 1
            # Else if left is empty, put bucket there
            elif i > 0 and s[i - 1] == '.':
                s[i - 1] = 'B'
                count += 1
            # No place to put a bucket to feed this hamster
            else:
                return -1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each position is checked once; bucket placements are constant-time.
- **Space Complexity:** O(n) — We use a list version of the string for marking bucket placements (extra O(n) space).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you return the actual indices of the buckets, not just the count?  
  *Hint: Track the positions where you actually place buckets.*

- What if a bucket can feed more than just left or right (e.g., also itself or two places away)?  
  *Hint: Adjust the neighborhood you're checking accordingly.*

- How would you adapt the approach for a 2D grid of hamsters and buckets?  
  *Hint: Consider each cell’s adjacent empty spaces in four directions (up/down/left/right).*

### Summary
This problem is a classic example of the greedy covering pattern — always placing a bucket at the rightmost possible position next to a hamster maximizes coverage for future hamsters. It's related to interval covering and greedy placement in optimal resource allocation, and this pattern is common in other greedy minimization problems for single-pass "feed or cover" scenarios.


### Flashcard
Sweep left to right; greedily place buckets at empty spots to cover hamsters, and return -1 if impossible.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Maximum Number of People That Can Be Caught in Tag(maximum-number-of-people-that-can-be-caught-in-tag) (Medium)
- Brightest Position on Street(brightest-position-on-street) (Medium)