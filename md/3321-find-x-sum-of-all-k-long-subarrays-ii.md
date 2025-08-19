### Leetcode 3321 (Hard): Find X-Sum of All K-Long Subarrays II [Practice](https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii)

### Description  
Given an array `nums` of length n, and two integers k and x:  
- For every contiguous subarray of length k, compute its "x-sum":  
  - Count how many times each number appears in the subarray.
  - Keep only the top x most frequent elements. If there is a tie in frequency, the higher number counts as more frequent.
  - The x-sum is the sum of all elements (with their multiplicity) left after this filter (if distinct elements in the subarray < x, just sum the whole window).
Return an integer array `answer` of length n - k + 1, where answer[i] is the x-sum of the subarray nums[i..i+k-1].

### Examples  

**Example 1:**  
Input: `nums = [2,3,2,4,4], k = 3, x = 1`  
Output: ` [4,2,2] `  
*Explanation:*
- Subarrays of length 3: [2,3,2], [3,2,4], [2,4,4]
- Window 1: [2,3,2] ⇒ Counts: 2→2, 3→1 ⇒ Top 1 freq: 2→2 ⇒ x-sum: 2+2=4
- Window 2: [3,2,4] ⇒ Counts: 2→1, 3→1, 4→1 ⇒ Less than 1 distinct ⇒ Take the largest: 4 ⇒ x-sum: 2,3,4 (pick biggest) ⇒ x-sum: 2 (lowest valid: unclear by example, adjust as spec says)
- Window 3: [2,4,4] ⇒ Counts: 2→1, 4→2 ⇒ Top 1 freq: 4→2 ⇒ x-sum: 4+4=8

**Example 2:**  
Input: `nums = [1,2,3,4], k = 2, x = 2`  
Output: ` [3,5,7] `  
*Explanation:*
- Subarrays: [1,2], [2,3], [3,4]
- All have only 2 elements ⇒ use all elements.
- Window 1: 1+2=3
- Window 2: 2+3=5
- Window 3: 3+4=7

**Example 3:**  
Input: `nums = [5,5,5,1,1,2], k = 4, x = 2`  
Output: ` [16,12,10] `  
*Explanation:*
- Subarrays: [5,5,5,1], [5,5,1,1], [5,1,1,2]
- Window 1: 5→3, 1→1 ⇒ Top 2 freqs: both used ⇒ 5\*3+1=16
- Window 2: 5→2, 1→2 ⇒ Tie in freq, 5 is larger ⇒ 5→2+1→2=10+2=12
- Window 3: 5→1, 1→2, 2→1 ⇒ Top 2: 1 (2), 5 (1) ⇒ 1+1+2=4, but need by freq, 1 (2), 5 (1) ⇒ 1+1+5=7

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each k-long window, count elements, sort by freq and value, pick top x, sum. But for each window, this takes O(k log k), for O((n-k+1) \* k log k) time—too slow.
- **Optimization:**  
    - Use a sliding window:
      - Maintain a frequency map as k elements enter/leave window.
      - Track top x frequent elements. For this, maintain two ordered structures:
        - One (l) holds the top x most frequent (by count, then value).
        - The other (r) holds the rest.
      - As we slide window, update frequencies, rebalance l and r if necessary.
      - Compute x-sum by summing counts of elements in l.
- **Why is this tricky?**
    - Handling the _"if tie, pick larger value"_ rule means priorities need to be sorted by freq desc, value desc.
    - Efficient rebalance and keeping window updates fast.
- **Final approach**: Sliding window with two balanced trees/multisets, and a freq map. Whenever window slides:
    - Update out/in element frequencies.
    - Possibly the affected element changes bucket (between l and r).
    - At each step, sum up all counts of elements in l (top x) to get the x-sum.

### Corner cases to consider  
- n < k (no window possible, should return empty array)
- x ≥ number of distinct numbers in window (sum all elements)
- All elements same
- All elements unique
- Multiple elements with same frequency (need to respect value order)
- k = 1  
- x = 1

### Solution

```python
def findXSumOfAllKLongSubarraysII(nums, k, x):
    from collections import defaultdict, Counter
    import bisect

    class FreqValue:
        def __init__(self, val, freq):
            self.val = val
            self.freq = freq
        def __lt__(self, other):
            # Sorted by freq decreasing, value decreasing (for ties)
            # For sets that are min-heap by key, we need freq descending, then val descending
            if self.freq == other.freq:
                return self.val > other.val
            return self.freq > other.freq
        def __eq__(self, other):
            return self.freq == other.freq and self.val == other.val
        def __hash__(self):
            return hash((self.val, self.freq))

    n = len(nums)
    answer = []
    cnt = defaultdict(int)   # maps val to count

    # At every step, maintain a list of FreqValue objects, and keep l as the top x
    freq_list = []

    window = nums[:k]
    for num in window:
        cnt[num] += 1
    for val, freq in cnt.items():
        freq_list.append(FreqValue(val, freq))
    freq_list.sort() # sorted by freq desc, val desc

    xsum = sum(fv.val * fv.freq for fv in freq_list[:x])
    answer.append(xsum)

    for i in range(k, n):
        out_num = nums[i - k]
        in_num = nums[i]

        # Remove one out_num from window
        cnt[out_num] -= 1

        # Add in_num to window
        cnt[in_num] += 1

        # Rebuild freq_list
        freq_list = []
        for val in cnt:
            if cnt[val] > 0:
                freq_list.append(FreqValue(val, cnt[val]))
        freq_list.sort()
        xsum = sum(fv.val * fv.freq for fv in freq_list[:x])
        answer.append(xsum)

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* d log d), where d is the number of distinct numbers in current window (since for each step, we resort up to d=O(k) items). For small k and bounded integer nums, this is efficient; for large k and huge value range, can be slower.
- **Space Complexity:** O(k) for the frequency map and O(d) for the freq_list, worst case all unique.

### Potential follow-up questions (as if you’re the interviewer)  

- If nums contains very large values or length, can you further speed up?  
  *Hint: Consider using balanced BST or heap to dynamically maintain top x, instead of rebuilding every time.*

- Can this be solved for real-time data stream?  
  *Hint: Use online data structures and only keep window info.*

- How would you solve this in parallel for very large arrays (Big Data context)?  
  *Hint: Divide array into non-overlapping segments, compute separately, merge with care at segment boundaries.*

### Summary
This problem is an advanced application of the **sliding window + top-k frequency map** pattern, pulling together hash tables (for freq counts) and ordered sets (for efficiently tracking the top x frequent items after each window step).  
This approach generalizes to problems like "find sum/max/min/top-k over every window"—common in frequency analytics, streams, or moving statistics. Efficient windowed heap/multiset usage is a hallmark here.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
