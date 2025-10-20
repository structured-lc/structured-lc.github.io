### Leetcode 1093 (Medium): Statistics from a Large Sample [Practice](https://leetcode.com/problems/statistics-from-a-large-sample)

### Description  
We’re given a list called **count** with 256 integers, where count[k] is the number of times the integer k appears in a huge sample (all values are in [0,255]). We must compute **five statistics** of the underlying sample:
- **Minimum**: The lowest value present (first index with count > 0).
- **Maximum**: The highest value present (last index with count > 0).
- **Mean**: The average value of all elements, i.e., (sum of elements) ÷ (total elements).
- **Median**: The middle value after sorting, or the average of the two middle values if there’s even count.
- **Mode**: The value that occurs most frequently (guaranteed unique).

The answer should be a list of floats in the order: `[minimum, maximum, mean, median, mode]`.

### Examples  

**Example 1:**  
Input: `count = [0,1,3,4,0,...0]` (rest zeros)  
Output: `[1.0, 3.0, 2.375, 2.5, 3.0]`  
*Explanation:*
- Indexes 1,2,3 present: 1 occurs once, 2 three times, 3 four times.
- Reconstructed values = [1,2,2,2,3,3,3,3]
- Min = 1, Max = 3, Mode = 3 (4 times), Mean = (1 + 2+2+2 + 3+3+3+3) / 8 = 19/8 = 2.375, Median = (3rd & 4th elements: 2 and 3 → (2+3)/2 = 2.5)

**Example 2:**  
Input: `count=[0,2,0,1,...0]`  
Output: `[1.0, 3.0, 1.6666667, 2.0, 1.0]`  
*Explanation:*  
- 1 appears 2 times, 3 once → [1,1,3]
- Min = 1, Max = 3, Mode = 1, Mean = (1+1+3)/3 = 1.666..., Median = 1 (middle element since n is odd)

**Example 3:**  
Input: `count=[0,...0,1,0,1]` (only 100 and 255 nonzero)  
Output: `[100.0, 255.0, 177.5, 177.5, 100.0]`  
*Explanation:*  
- [100,255]
- Min=100, Max=255, Mode=100 (mode is lowest if tied but here unique), Mean=177.5, Median=177.5

### Thought Process (as if you’re the interviewee)  
I recognized that **count** gives us frequencies for numbers 0–255, so iterating through once lets us accumulate all stats in O(256)—constant time. During this pass, we can:
- Track smallest/largest indexes for min/max.
- Track the sum and total count for mean.
- Track highest frequency for mode.
- For the median, we need to know the halfway point(s), as the underlying array is not constructed explicitly.

**Median challenge**: with the total count N, the median(s) are at position ⌊N/2⌋ if odd, or (N/2−1, N/2) if even (0-indexed). We can find them by counting as we go.

Optimizations:
- Single pass: collect min, max, sum, mode, freq, and keep frequency/cumulative counts.
- Second pass (or in the same loop), when accumulating the running total, find which values cross the median positions.

### Corner cases to consider  
- All elements zero except one index (singleton).
- All elements equal (e.g., only 100’s).
- Empty sample (all counts zero)—Not possible per problem.
- Median position is between two distinct numbers (even count).
- Maximum frequency is at index zero or 255.

### Solution

```python
def sampleStats(count):
    # Stats to compute
    minimum = None
    maximum = None
    total = 0     # sum of all values × their counts
    n = 0         # total number of elements
    mode = 0
    mode_freq = 0

    # Find min, max, total sum, count, and mode
    for val in range(256):
        freq = count[val]
        if freq > 0:
            if minimum is None:
                minimum = val
            maximum = val  # will end up as highest nonzero
            total += val * freq
            n += freq
            if freq > mode_freq:
                mode = val
                mode_freq = freq

    # Compute mean
    mean = total / n

    # Median
    m1 = (n + 1) // 2   # first median index (1-based)
    m2 = (n // 2) + 1   # second median index (for even)
    cur = 0
    median_vals = []
    for val in range(256):
        freq = count[val]
        if freq == 0:
            continue
        prev = cur
        cur += freq
        # Find where the medians land in the sorted array
        if prev < m1 <= cur:
            median_vals.append(val)
        if prev < m2 <= cur:
            median_vals.append(val)
        if len(median_vals) == 2:
            break

    median = (median_vals[0] + median_vals[-1]) / 2

    return [
        float(minimum),
        float(maximum),
        float(mean),
        float(median),
        float(mode)
    ]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(256) — One pass through possible values, always fixed, so it's O(1) in practice.
- **Space Complexity:** O(1) — Only a few variables, no significant extra space proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- If the count array were much larger (e.g., non-constant value range), how would you change your approach?  
  *Hint: Can you avoid O(N) space and computation?*

- How would you handle a data stream arriving sequentially, and you want running stats?  
  *Hint: Think about maintaining online stats like running mean and medians using heaps or other data structures.*

- If there could be multiple modes, how would you return all of them?  
  *Hint: Collect every value whose frequency == max frequency.*

### Summary
This problem uses the **"counting sort frequency array"** pattern to efficiently extract statistics without ever reconstructing the original array—even if the uncompressed sample would be huge. The overall design leverages constant range and simple cumulative counting, a common trick for fixed known domains (e.g., histogram, digit buckets). This pattern is generally applicable for stats on histograms, bucketed frequencies, and certain streaming or fixed-range problems.


### Flashcard
Single pass through count array (0–255)—track min/max indices, sum/total for mean, max frequency for mode; for median, calculate positions total/2 and (total+1)/2, accumulate frequencies until reaching those positions.

### Tags
Array(#array), Math(#math), Probability and Statistics(#probability-and-statistics)

### Similar Problems
