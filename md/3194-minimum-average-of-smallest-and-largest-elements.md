### Leetcode 3194 (Easy): Minimum Average of Smallest and Largest Elements [Practice](https://leetcode.com/problems/minimum-average-of-smallest-and-largest-elements)

### Description  
You are given an array of integers nums of even length n. Repeatedly, do the following n/2 times:
- Remove the smallest element and the largest element from nums.
- Record the average of these two numbers in an array.
After all pairs are processed, return the **minimum** average obtained from all rounds.

### Examples  

**Example 1:**  
Input: `nums = [1,3,4,7,13,15]`  
Output: `5.5`  
*Explanation:  
Pair 1: smallest=1, largest=15 → (1+15)/2 = 8  
Pair 2: smallest=3, largest=13 → (3+13)/2 = 8  
Pair 3: smallest=4, largest=7 → (4+7)/2 = 5.5  
Final averages: [8, 8, 5.5], so minimum is 5.5*

**Example 2:**  
Input: `nums = [5,2,9,1]`  
Output: `3.5`  
*Explanation:  
Pair 1: smallest=1, largest=9 → (1+9)/2 = 5  
Pair 2: smallest=2, largest=5 → (2+5)/2 = 3.5  
Averages: [5, 3.5], so minimum is 3.5*

**Example 3:**  
Input: `nums = [4,4,4,4]`  
Output: `4.0`  
*Explanation:  
Pair 1: smallest=4, largest=4 → (4+4)/2 = 4  
Pair 2: smallest=4, largest=4 → (4+4)/2 = 4  
Averages: [4, 4], so minimum is 4*

### Thought Process (as if you’re the interviewee)  
- Brute force idea:  
  For n/2 rounds, repeatedly find and remove the smallest and largest elements, and record their average. Each removal would require O(n) scanning, leading to O(n²) time.  
- Optimization:  
  Since we always want smallest and largest, sorting nums initially makes both easy to find without searching each time. After sorting, simply pair the iᵗʰ element from the start with the iᵗʰ from the end:  
  nums with nums[n-1], nums[1] with nums[n-2], etc.  
  For each pair, calculate the average and record the minimum among all.  
- Tradeoff: Sorting is O(n log n), then just one O(n) pass—much faster than O(n²).  
- This approach is optimal because the pairing strategy always yields the exact numbers we’d remove from an unsorted array.

### Corner cases to consider  
- Single pair arrays, e.g. [a, b] (still works as n is even)
- Arrays with all equal elements, e.g. [4,4,4,4] (averages all the same)
- Negative and positive numbers
- Large input sizes (check efficiency)
- Array where minimum and maximum values are next to each other (the order doesn’t matter after sorting)
- Ensure floating point division for average

### Solution

```python
def minimumAverage(nums):
    # Sort the input array so smallest and largest are paired easily
    nums.sort()
    n = len(nums)
    
    min_avg = float('inf')

    # Pair from outside in: i and n-1-i
    for i in range(n // 2):
        smallest = nums[i]
        largest = nums[n - 1 - i]
        avg = (smallest + largest) / 2
        if avg < min_avg:
            min_avg = avg

    return min_avg
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting takes O(n log n), and a single O(n) pass for averages.
- **Space Complexity:** O(1) (not counting input), as only a few variables are used after sorting in place. Extra O(n) if sort is not in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input length n could be odd?  
  *Hint: How would you handle the last middle element, and does it impact the process?*  

- Can this be adapted if the pairing requirement changes to, for example, pairing every two consecutive elements?  
  *Hint: How would this affect your pairing and sorting strategy?*  

- What if you wanted the maximum average, or the set of all averages, not just the minimum?  
  *Hint: Modify your reduction step / return value.*

### Summary
This problem leverages the **two-pointer technique**: after sorting, processing from both ends controls the smallest/largest removals efficiently in one pass. The pattern is common in problems involving pairwise minimization or maximization, such as pairing for smallest difference, or minimizing/maximizing resource use in scheduling. Sorting as a preprocessing step to enable O(n) pairing is a powerful and reusable pattern for many array problems where "smallest/largest" type selection is repeated.


### Flashcard
Sort the array; pair nums[i] with nums[n−1−i] for i = 0 to n/2−1, compute each average, and return the minimum.

### Tags
Array(#array), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Number of Distinct Averages(number-of-distinct-averages) (Easy)