import streamlit as st
import streamlit.components.v1 as components
import os

# Streamlit Page Configurations
st.set_page_config(
    page_title="TrustFix Mobile Prototype",
    page_icon="📱",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to hide Streamlit header, footer, menus, and maximize iframe spacing
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding-top: 0rem;
            padding-bottom: 0rem;
            padding-left: 0rem;
            padding-right: 0rem;
            max-height: 100vh;
            overflow: hidden;
        }
        div[data-testid="stVerticalBlock"] > div {
            padding: 0;
        }
        iframe {
            display: block;
            border: none;
            width: 100%;
            height: 98vh;
        }
    </style>
""", unsafe_allow_html=True)

# Path to the compiled HTML file
html_path = os.path.join(os.path.dirname(__file__), "dist", "index.html")

if os.path.exists(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html_code = f.read()
    
    # Render the interactive React web application
    components.html(html_code, height=920, scrolling=True)
else:
    st.title("📱 TrustFix Mobile MVP")
    st.warning("Production build files not detected!")
    st.info("The application needs to be compiled before Streamlit can render it. Please run the following command in your terminal:")
    st.code("npm run build", language="bash")
    
    # Fallback status check
    if st.button("Refresh Page after Building"):
        st.rerun()
