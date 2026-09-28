
        // Tracking function (same logic as your Python code)
        function tracking(text) {
            if (text.toLowerCase().includes("python")) {
                source = "Possible source is A";
                similarity = 80;
            } else if (text.toLowerCase().includes("hackathon")) {
                source = "Possible source is B";
                similarity = 90;
            } else if (text.toLowerCase().includes("artificial intelligence") || text.toLowerCase().includes("artificial intellegence")) {
                source = "Possible source is C";
                similarity = 50;
            } else if (text.toLowerCase().includes("algebra")) {
                source = "Possible source is D";
                similarity = 40;
            } else {
                source = "not known";
                similarity = 0;
            }

            if (100 > similarity && similarity > 69) {
                status = "high matched";
            } else if (70 > similarity && similarity > 39) {
                status = "moderate matched";
            } else if (40 > similarity && similarity > 29) {
                status = "medium matched";
            } else {
                status = "no matched";
            }

            return {
                source: source,
                similarity: similarity,
                status: status
            };
        }

        // Track data and display results
        function trackData() {
            const textInput = document.getElementById("textInput").value.trim();
            const errorMessage = document.getElementById("errorMessage");

            errorMessage.classList.remove("show");

            if (!textInput) {
                errorMessage.textContent = "Please enter some text to track.";
                errorMessage.classList.add("show");
                return;
            }

            const result = tracking(textInput);
            displayResults(result, textInput);
            addToHistory(textInput, result);
        }

        // Display results on the page
        function displayResults(result, inputText) {
            const resultsSection = document.getElementById("resultsSection");
            const sourceResult = document.getElementById("sourceResult");
            const similarityValue = document.getElementById("similarityValue");
            const similarityFill = document.getElementById("similarityFill");
            const fillPercent = document.getElementById("fillPercent");
            const statusResult = document.getElementById("statusResult");

            sourceResult.textContent = result.source;
            similarityValue.textContent = result.similarity + "%";
            similarityFill.style.width = result.similarity + "%";
            fillPercent.textContent = result.similarity + "%";

            statusResult.textContent = result.status;
            statusResult.className = "result-value status-badge status-" + 
                (result.status === "high matched" ? "high" : 
                 result.status === "moderate matched" ? "moderate" : 
                 result.status === "medium matched" ? "medium" : "no");

            resultsSection.classList.add("active");
        }

        // Add to tracking history
        function addToHistory(text, result) {
            let history = JSON.parse(localStorage.getItem("trackingHistory")) || [];
            
            history.unshift({
                text: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
                source: result.source,
                similarity: result.similarity,
                time: new Date().toLocaleTimeString()
            });

            // Keep only last 10 entries
            if (history.length > 10) {
                history.pop();
            }

            localStorage.setItem("trackingHistory", JSON.stringify(history));
            displayHistory();
        }

        // Display history
        function displayHistory() {
            const history = JSON.parse(localStorage.getItem("trackingHistory")) || [];
            const historyList = document.getElementById("historyList");
            const historySection = document.getElementById("historySection");

            if (history.length === 0) {
                historySection.style.display = "none";
                return;
            }

            historySection.style.display = "block";
            historyList.innerHTML = "";

            history.forEach((item, index) => {
                const historyItem = document.createElement("div");
                historyItem.className = "history-item";
                historyItem.innerHTML = `
                    <div>
                        <div class="history-text"><strong>${item.text}</strong></div>
                        <div class="history-text" style="font-size: 0.85em; color: #888;">
                            ${item.source} • Similarity: ${item.similarity}%
                        </div>
                    </div>
                    <span class="history-time">${item.time}</span>
                `;
                historyList.appendChild(historyItem);
            });
        }

        // Clear all
        function clearAll() {
            document.getElementById("textInput").value = "";
            document.getElementById("resultsSection").classList.remove("active");
            document.getElementById("errorMessage").classList.remove("show");
        }

        // Clear history
        function clearHistory() {
            localStorage.removeItem("trackingHistory");
            displayHistory();
        }

        // Load history on page load
        window.addEventListener("load", displayHistory);

        // Allow Enter key to trigger tracking
        document.getElementById("textInput").addEventListener("keydown", function(event) {
            if (event.key === "Enter" && event.ctrlKey) {
                trackData();
            }
        });