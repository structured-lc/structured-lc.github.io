### Leetcode 2808 (Medium): Minimum Seconds to Equalize a Circular Array [Practice](https://leetcode.com/problems/minimum-seconds-to-equalize-a-circular-array)

### Description  
You are given a circular array of length n, where every second you can update any element to become equal to either itself, its left neighbor, or its right neighbor (wrapping around).
Your goal is to determine the **minimum number of seconds required** so that **all elements in the array become equal**.
In each second, all updates are applied simultaneously.

### Examples  

**Example 1:**  
Input: `[2,1,3,3,2]`  
Output: `2`  
*Explanation: 2 can expand to positions 0 and 4, but the furthest 2’s are 2 indices apart (positions 0 and 4). Each 2 can only "spread" by 1 per second, so you need ⌊2/2⌋ = 1 step for 2 to expand everywhere. But for other values, it could take longer, so checking for each value, the minimum is 2 seconds overall.*

**Example 2:**  
Input: `[1,2,1,2]`  
Output: `1`  
*Explanation: Convert everything to 1 or everything to 2. The furthest gap between consecutive 1’s is 2 (between index 0 and 2, and between 2 and 0 across the circle). One second suffices, because each "1" can reach all indices next to or between it after one step.*

**Example 3:**  
Input: `[1,2,3,4]`  
Output: `1`  
*Explanation: Each index can use one of its neighbors. In 1 second, all numbers can be turned into any of their neighbors' value. Thus, it takes 1 second to equalize the array to any of the existing numbers.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try converting all elements into each possible value, and simulate spread step-by-step. This is far too slow for n up to 10⁵.
- **Optimized approach:**  
  - Notice: To spread a value to all indices, treat each index where the value occurs as a "center" that can expand by one position left/right every second.
  - For a value `x`, record all positions containing `x`. The biggest "gap" between adjacent `x`'s (taking wraparound into consideration) is the hardest to reach, as it takes the longest for the fronts to meet.
  - The minimum time to fill such a gap is ⌊gap/2⌋ seconds (both sides meet in the middle).
  - So for each unique value in the array:
    - Collect all indices of `x` in a sorted list.
    - Find the **maximum gap** between index pairs (with wraparound).
    - The minimum seconds needed to fill the gap is ⌊max_gap/2⌋.
    - The answer is the minimal such time over all values.
- **Why this works:**  
  - Each value "spreads" out simultaneously from its positions, and the only limit is the furthest gap in its occurrences.
  - The method is O(n) as we only scan and group indices.

### Corner cases to consider  
- Array length = 1 (already equal)
- All elements already equal
- No repeated elements (forced to pick any value and fill all)
- Elements repeated but not adjacent (special wraparound consideration)
- Large n (efficiency important)

### Solution

```python
def minimumSeconds(nums):
    n = len(nums)
    from collections import defaultdict

    # Collect indices for each unique value
    value_to_indices = defaultdict(list)
    for i, num in enumerate(nums):
        value_to_indices[num].append(i)

    min_seconds = n

    for indices in value_to_indices.values():
        # Sort indices (they may already be in order)
        indices = sorted(indices)

        # Calculate all distances between consecutive same-value positions, with wraparound
        max_gap = 0
        m = len(indices)
        for i in range(m):
            # distance to next same value, wrapping around
            dist = (indices[(i + 1) % m] - indices[i] + n) % n
            if dist == 0:  # skip itself
                continue
            max_gap = max(max_gap, dist)
        seconds = max_gap // 2
        min_seconds = min(min_seconds, seconds)

    return min_seconds
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Building the dictionary and scanning the indices is overall linear in the size of the array, as each element is visited at most twice.
- **Space Complexity:** O(n)  
  Extra space is proportional to the number of indices stored (at most n across all values).

### Potential follow-up questions (as if you’re the interviewer)  

- What if updates were not simultaneous, but applied sequentially?  
  *Hint: Try breadth-first search per target value.*

- Can you output the actual sequence of operations needed to equalize the array?  
  *Hint: Track BFS layers and reconstruct updates.*

- What if you could change a value to any value, not just neighbor values?  
  *Hint: Would always be 1 second, as all elements can be fired at once.*

### Summary
This problem is a classic example of **simulating a spread from multiple sources in a circular structure**, with a focus on finding the bottleneck gap between occurrences.  
Patterns used:  
- **Greedy minimum over all value choices**
- **Hash map grouping**
- **Distance/gap-finding with wraparound (circular array)**
This approach and pattern often appears in problems about simultaneous spread, wavefronts, or circular adjacency, such as problems involving infection, voting, or minimum propagation time in rings.


### Flashcard
For each value, find all positions where it appears; the bottleneck is the largest gap between consecutive positions (with wraparound)—divide by 2 and round up.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
