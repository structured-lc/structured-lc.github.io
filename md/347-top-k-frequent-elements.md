### Leetcode 347 (Medium): Top K Frequent Elements [Practice](https://leetcode.com/problems/top-k-frequent-elements)

### Description  
Given an array of integers (`nums`) and an integer (`k`), return the `k` elements that appear most frequently in the array.  
The answer can be returned in any order.  
For example: if you have a list of numbers, find the `k` numbers that show up most often.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,2,2,3]`, `k = 2`  
Output: `[1,2]`  
*Explanation: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time. The top 2 most frequent are 1 and 2.*

**Example 2:**  
Input: `nums = [1]`, `k = 1`  
Output: `[1]`  
*Explanation: Only 1 occurs, so it is the most frequent element by default.*

**Example 3:**  
Input: `nums = [4,1,-1,2,-1,2,3]`, `k = 2`  
Output: `[-1,2]`  
*Explanation: -1 and 2 both appear twice, more than any other number. Output order does not matter.*

### Thought Process (as if you’re the interviewee)  
Let’s start with the brute-force approach:  
- **Step 1:** Count how many times each number appears using a map (hash map).
- **Step 2:** Sort all numbers based on how many times they appear.
- **Step 3:** Choose the top `k` from the sorted list.

**Brute-force drawbacks:** Sorting has O(n log n) time, which is slower than optimal. We’re trying to get better than this.

**Optimized Approach:**
- **Counting:** Still use a hash map to count frequencies, which is O(n).
- **Selection:** Instead of sorting, we can use a heap (min-heap of size k) or a bucket sort.

**Bucket sort idea:**  
- Since the highest possible frequency for any element is n (if all are the same), we can build an array of size n+1 ("buckets").  
- Place each number in the bucket corresponding to its frequency.
- Walk from the highest frequency backwards, collecting numbers until we've got k of them.

**Why bucket sort:**  
- Since frequencies are bounded (at most n), this works in O(n) time.
- Both space and time efficient for this specific counting problem.

**Heap alternative:**  
- Build a min-heap with k elements.  
- For each unique number, push it into the heap. If the heap grows past k, pop the smallest frequency.  
- Finally, extract k elements from the heap.

Between the two, bucket sort is simpler and O(n) time, which is optimal. For most interview settings, that would be the preferred solution.

### Corner cases to consider  
- nums is empty (guaranteed non-empty, per problem).
- k = 1
- nums contains all identical elements
- All elements occur the same number of times
- nums has negative and positive numbers
- k equals the length of unique elements in nums

### Solution

```python
def topKFrequent(nums, k):
    # Step 1: Build frequency map
    freq_map = {}
    for num in nums:
        freq_map[num] = freq_map.get(num, 0) + 1

    # Step 2: Build buckets. 
    # Each bucket index represents the frequency, contains list of numbers with that frequency.
    n = len(nums)
    buckets = [[] for _ in range(n+1)]
    for num, freq in freq_map.items():
        buckets[freq].append(num)
    
    # Step 3: Gather top k frequent elements from the buckets, starting from highest frequency
    result = []
    for freq in range(n, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - O(n) for counting frequencies.  
  - O(n) to build buckets and collect results (since each element processed once).
  - No sorting or extra data structures that could increase the time.
- **Space Complexity:** O(n)
  - O(n) for the frequency map.
  - O(n) for the buckets.
  - O(n) for the result array in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if the stream of numbers is too large to fit in memory?  
  *Hint: Think about using external memory data structures or the Misra-Gries algorithm.*

- What if you are required to return the elements in order of highest to lowest frequency?  
  *Hint: You'll need to sort or use a priority queue.*

- Can you solve it in O(n log k) time if k is much smaller than n?  
  *Hint: Try using a min-heap of size k for maintaining the top-k elements on the fly.*

### Summary
This problem is a classic example of the **hash map + bucket sort pattern**, especially when frequency of occurrence is involved and the input space is bounded.  
Bucket sort enables linear time since the frequency range is capped at the input size.  
The pattern arises in many "top-k" frequency or histogram scenarios, such as word counts, most common objects, or log analysis.  
Common alternative: Use heaps when k ≪ n or when frequencies change dynamically.


### Flashcard
Count frequencies with a hash map, then use a heap or bucket sort to extract the k most frequent elements in O(n) time.

### Tags
Array(#array), Hash Table(#hash-table), Divide and Conquer(#divide-and-conquer), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Bucket Sort(#bucket-sort), Counting(#counting), Quickselect(#quickselect)

### Similar Problems
- Word Frequency(word-frequency) (Medium)
- Kth Largest Element in an Array(kth-largest-element-in-an-array) (Medium)
- Sort Characters By Frequency(sort-characters-by-frequency) (Medium)
- Split Array into Consecutive Subsequences(split-array-into-consecutive-subsequences) (Medium)
- Top K Frequent Words(top-k-frequent-words) (Medium)
- K Closest Points to Origin(k-closest-points-to-origin) (Medium)
- Sort Features by Popularity(sort-features-by-popularity) (Medium)
- Sender With Largest Word Count(sender-with-largest-word-count) (Medium)
- Most Frequent Even Element(most-frequent-even-element) (Easy)
- Linked List Frequency(linked-list-frequency) (Easy)