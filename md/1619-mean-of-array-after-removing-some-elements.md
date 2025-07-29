### Leetcode 1619 (Easy): Mean of Array After Removing Some Elements [Practice](https://leetcode.com/problems/mean-of-array-after-removing-some-elements)

### Description  
Given an integer array, remove the smallest 5% and largest 5% elements (trimming both ends after sorting), then return the mean (average) of the remaining elements as a float. The output should be precise within 10⁻⁵.

### Examples  

**Example 1:**  
Input: `[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]`  
Output: `2.00000`  
*Explanation: After removing the smallest (1) and largest (3) 5% (i.e. one element each from both ends), all remaining elements are 2, so mean is 2.*

**Example 2:**  
Input: `[6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0]`  
Output: `4.00000`  
*Explanation: Array sorted: [0,0,0,0,1,2,2,2,3,5,5,5,5,6,6,7,7,8,8,10]. Remove 1 (5%) from each end: , . Sum remaining 18 numbers, divide by 18 ⇒ mean = 4.0.*

**Example 3:**  
Input: `[6,0,7,0,7,5,7,8,3,4,0,7,8,1,6,8,1,1,2,4,8,1,9,5,4,3,8,5,10,8,6,6,1,0,6,10,8,2,3,4]`  
Output: `4.77778`  
*Explanation: 5% of 40 = 2, so remove 2 smallest and 2 largest after sorting. Compute mean of middle 36 elements, round to 5 decimal places.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Sort the array, remove k lowest and k highest elements (where k = ⌊n × 5%⌋), and calculate the mean of the remaining numbers.  
- **Optimized approach:**  
  Sorting is O(n log n), and this is necessary to identify the smallest and largest 5%.  
  Using slicing after sorting simplifies code and is acceptable for the constraints.  
  To avoid off-by-one errors, be careful with integer division (⌊n × 5/100⌋).  

**Why this approach?**  
- No faster way to reliably trim both ends without sorting.  
- The array can be large, but since O(n log n) is efficient for reasonable n (performance is acceptable; much simpler than using a data structure like heaps for this context).

### Corner cases to consider  
- n not a multiple of 20: floor division handles this when calculating 5%  
- All elements equal after trimming (exclusive ends)  
- Trimmed segment includes duplicates or all values are the same  
- Input array is already sorted, or reverse order  
- Minimum allowed array size (as per constraints)
- Output must have 5 decimal points

### Solution

```python
def trimMean(arr):
    # Sort the input array
    arr.sort()
    n = len(arr)
    # Calculate number of elements to trim from each end (5%)
    k = n // 20
    # Take slice without k smallest and k largest elements
    trimmed = arr[k:n-k]
    # Calculate sum and mean of trimmed array
    total = 0
    for num in trimmed:
        total += num
    mean = total / len(trimmed)
    return mean
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting the array dominates. Slicing and summing are O(n).
- **Space Complexity:** O(n)  
  Slicing allocates a new array of ~90% of n elements. If slicing avoided, can do O(1) extra space by summing directly over indices.

### Potential follow-up questions (as if you’re the interviewer)  

- If the array is extremely huge (cannot fit in memory), how can you find the trimmed mean?  
  *Hint: Think about streaming algorithms or using min-heap/max-heap to track only required values.*

- Can this be done without sorting?  
  *Hint: Selection algorithms like QuickSelect/Nth Element allow finding the kᵗʰ smallest/largest in O(n) time.*

- How do you generalize this to remove x% smallest and y% largest elements?  
  *Hint: Make trim size parameterizable.*

### Summary
This is a classic **sorting and windowing** pattern: trim the array by removing both ends after sorting, then operate on the middle. The approach is simple and robust, relying on O(n log n) sorting and slicing. Similar ideas are widely used in statistics (trimmed mean), and the pattern generalizes to problems involving quantiles, percentiles, or outlier removal.